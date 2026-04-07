import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

    // 📧 Dual Email Notifications
    if (process.env.RESEND_API_KEY) {
      try {
        // 1. Internal Notification (to Raster Media Admin)
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'rastermedia.lk@gmail.com',
          subject: `NEW MODEL REGISTRATION: ${body.fullName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #5DCDDB;">New Model Registration</h2>
              <p><strong>Name:</strong> ${body.fullName}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Instagram:</strong> <a href="https://instagram.com/${body.instagramHandle.replace('@', '')}">${body.instagramHandle}</a></p>
              <p><strong>Categories:</strong> ${body.categories.join(', ')}</p>
              <br />
              <a href="https://rastermedia.lk/admin/careers" style="background: #5DCDDB; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Review in Admin Panel</a>
            </div>
          `
        });

        // 2. External Confirmation (to the Applicant)
        await resend.emails.send({
          from: 'Raster Media <info@rastermedia.lk>',
          to: body.email,
          subject: 'Registration Received - Raster Media',
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Hello ${body.fullName},</h2>
              <p>Thank you for registering with Raster Media's model database.</p>
              <p>We have received your details and photos. We will review your submission and contact you if any upcoming projects or shoots match your profile.</p>
              <p>We're excited to potentially work with you!</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `
        });
      } catch (err) { console.error('Email failed to send:', err); }
    }

    return NextResponse.json(newRegistration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit model registration' }, { status: 500 });
  }
}
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    await dbConnect();
    const updated = await ModelApplication.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    await ModelApplication.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}
