import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Review from '../../../src/models/Review';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    await dbConnect();
    
    const query = all ? {} : { verified: true };
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const newReview = await Review.create({
      name: body.name,
      email: body.email,
      text: body.text,
      rating: body.rating,
      verified: false,
      createdAt: new Date(),
    });

    // 📧 Dual Email Notifications
    if (process.env.RESEND_API_KEY) {
      try {
        // 1. Internal Notification (to Raster Media Admin)
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'rastermedia.lk@gmail.com',
          subject: `NEW REVIEW SUBMITTED: ${body.name} (${body.rating} Stars)`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #5DCDDB;">New Review to Moderate</h2>
              <p><strong>Reviewer:</strong> ${body.name}</p>
              <p><strong>Rating:</strong> ${body.rating} / 5 Stars</p>
              <p><strong>Review:</strong> "${body.text}"</p>
              <br />
              <a href="https://rastermedia.lk/admin/reviews" style="background: #5DCDDB; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Moderation Panel</a>
            </div>
          `
        });

        // 2. External Confirmation (to the Reviewer)
        await resend.emails.send({
          from: 'Raster Media <info@rastermedia.lk>',
          to: body.email,
          subject: 'Review Received - Raster Media',
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Thank you, ${body.name}!</h2>
              <p>We've received your feedback. Your review will be visible on our website once it has been verified by our team.</p>
              <p>We truly value your input and appreciate you taking the time to share your experience with us.</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `
        });
      } catch (err) { console.error('Email failed to send:', err); }
    }

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
export async function PATCH(request: Request) {
  try {
    const { id, verified } = await request.json();
    await dbConnect();
    const updated = await Review.findByIdAndUpdate(id, { verified }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
