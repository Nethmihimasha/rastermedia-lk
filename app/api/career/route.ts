import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import dbConnect from '../../../src/lib/mongodb';
import CareerApplication from '../../../src/models/CareerApplication';
import { Resend } from 'resend';
import { getAdminSession } from '../../../src/lib/adminAuth';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // 📧 Email Notifications
    if (resend) {
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
              <p>Thank you for reaching out to <strong>Raster Media</strong> and applying for the <strong>${body.position}</strong> position.</p>
              <p>We have successfully received your application and CV. Our team will review your profile thoroughly, and we will get back to you soon regarding the next steps.</p>
              <p>Thank you for your interest in joining our creative team!</p>
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
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    if (!['pending', 'reviewed', 'shortlisted', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    await dbConnect();
    const updated = await CareerApplication.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await dbConnect();
    await CareerApplication.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
