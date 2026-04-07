import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import ModelApplication from '../../../src/models/ModelApplication';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await dbConnect();
    const applications = await ModelApplication.find({}).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch model registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const newRegistration = await ModelApplication.create(body);

    // Email notification to Admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'info@rastermedia.lk',
          subject: `New Model Registration: ${body.fullName}`,
          html: `<p>Name: ${body.fullName}</p>
                 <p>Instagram: <a href="https://instagram.com/${body.instagramHandle.replace('@', '')}">${body.instagramHandle}</a></p>
                 <p>Categories: ${body.categories.join(', ')}</p>`
        });
      } catch (err) { console.error(err); }
    }

    return NextResponse.json(newRegistration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit model registration' }, { status: 500 });
  }
}
