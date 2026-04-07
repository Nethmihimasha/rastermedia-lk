import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import dbConnect from '../../../src/lib/mongodb';
import CareerApplication from '../../../src/models/CareerApplication';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await dbConnect();
    const applications = await CareerApplication.find({}).sort({ createdAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const newApplication = await CareerApplication.create(body);

    // 📧 Dual Email Notifications
    if (process.env.RESEND_API_KEY) {
      try {
        // 1. Internal Notification (to Raster Media Admin)
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'rastermedia.lk@gmail.com',
          subject: `NEW CAREER APPLICATION: ${body.position} - ${body.fullName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #5DCDDB;">New Career Application</h2>
              <p><strong>Name:</strong> ${body.fullName}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Position:</strong> ${body.position}</p>
              <p><strong>CV:</strong> <a href="${body.cvUrl}">${body.cvUrl}</a></p>
              <br />
              <a href="https://rastermedia.lk/admin/careers" style="background: #5DCDDB; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Review in Admin Panel</a>
            </div>
          `
        });

        // 2. External Confirmation (to the Applicant)
        await resend.emails.send({
          from: 'Raster Media <info@rastermedia.lk>',
          to: body.email,
          subject: 'Application Received - Raster Media',
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Hello ${body.fullName},</h2>
              <p>Thank you for applying for the <strong>${body.position}</strong> position at Raster Media.</p>
              <p>We have received your CV and details. Our hiring team will review your application and get in touch if your background matches our needs.</p>
              <p>Good luck!</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `
        });
      } catch (err) { console.error('Email failed to send:', err); }
    }

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    await dbConnect();
    const updated = await CareerApplication.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    await CareerApplication.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
