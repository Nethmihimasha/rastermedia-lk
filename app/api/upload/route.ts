import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileMaybe = formData.get('file');
    const folderMaybe = formData.get('folder');

    const file = fileMaybe instanceof File ? fileMaybe : null;
    const folder =
      typeof folderMaybe === 'string' && folderMaybe.trim().length > 0
        ? folderMaybe.trim()
        : 'raster-media/uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const allowedFolders = new Set([
      'raster-media/uploads',
      'raster-media/portfolio',
      'raster-media/models',
      'raster-media/careers',
    ]);

    if (!allowedFolders.has(folder)) {
      return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
    }

    const mime = file.type || '';
    const sizeBytes = file.size || 0;

    const isImage = mime.startsWith('image/');
    const isVideo = mime.startsWith('video/');
    const isPdfOrDoc =
      mime === 'application/pdf' ||
      mime.includes('wordprocessingml') ||
      mime === 'application/msword';

    // Basic limits to avoid abuse.
    if (folder === 'raster-media/models' && !isImage) {
      return NextResponse.json({ error: 'Only images are allowed for models' }, { status: 400 });
    }
    if (folder === 'raster-media/careers' && !isPdfOrDoc) {
      return NextResponse.json({ error: 'Only PDF/DOC files are allowed for careers' }, { status: 400 });
    }
    if (folder === 'raster-media/portfolio' && !(isImage || isVideo)) {
      return NextResponse.json({ error: 'Only images/videos are allowed for portfolio' }, { status: 400 });
    }

    const maxSizeMB =
      folder === 'raster-media/portfolio' && isVideo ? 50 : folder === 'raster-media/models' ? 20 : 15;

    if (sizeBytes > maxSizeMB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large (max ${maxSizeMB}MB)` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a promise to handle stream
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error: unknown, uploadResult: unknown) => {
          if (error) {
            reject(error);
            return;
          }
          if (!uploadResult || typeof uploadResult !== 'object') {
            reject(new Error('Upload failed: empty response'));
            return;
          }

          const u = uploadResult as { secure_url?: unknown; public_id?: unknown };
          const secure_url = typeof u.secure_url === 'string' ? u.secure_url : null;
          const public_id = typeof u.public_id === 'string' ? u.public_id : null;
          if (!secure_url || !public_id) {
            reject(new Error('Upload failed: missing secure_url/public_id'));
            return;
          }

          resolve({ secure_url, public_id });
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    console.error('Upload Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
