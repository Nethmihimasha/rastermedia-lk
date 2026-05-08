import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Inquiry from '../../../src/models/Inquiry';
import { Resend } from 'resend';
import { getAdminSession } from '../../../src/lib/adminAuth';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    await dbConnect();
    let query = {};
    if (type === 'booking') query = { type: 'booking' };
    if (type === 'contact') query = { type: 'contact' };
    
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.message || !body?.type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!['contact', 'booking', 'career'].includes(body.type)) {
      return NextResponse.json({ error: 'Invalid inquiry type' }, { status: 400 });
    }
    if (body.type === 'booking' && !body?.whatsapp) {
      return NextResponse.json({ error: 'whatsapp is required for booking' }, { status: 400 });
    }
    await dbConnect();
    
    const newInquiry = await Inquiry.create({
      name: body.name,
      email: body.email,
      message: body.message,
      type: body.type, // 'contact', 'booking', 'career'
      whatsapp: body.whatsapp,
      time: body.time,
      status: 'pending',
      createdAt: new Date(),
    });

    // 📧 Email notifications
    if (resend) {
      try {
        const isBooking = body.type === 'booking';
        
        // 1. Internal Notification (to Raster Media Admin)
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'rastermedia.lk@gmail.com',
          subject: `NEW ${body.type.toUpperCase()}: ${body.name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #5DCDDB;">New ${isBooking ? 'Studio Booking' : 'Contact Message'}</h2>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              ${body.whatsapp ? `<p><strong>WhatsApp:</strong> ${body.whatsapp}</p>` : ''}
              ${body.time ? `<p><strong>Scheduled Time:</strong> ${body.time}</p>` : ''}
              <hr />
              <p><strong>Message:</strong></p>
              <p>${body.message}</p>
              <br />
              <a href="https://rastermedia.lk/admin/inquiries" style="background: #5DCDDB; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
            </div>
          `
        });

        // 2) External Confirmation (to the Client)
        // - booking: acknowledge immediately with ~2-hours promise
        // - contact: acknowledge receipt and promise a follow-up
        await resend.emails.send({
          from: 'Raster Media <info@rastermedia.lk>',
          to: body.email,
          subject: isBooking ? 'Booking Received - Raster Media' : 'Message Received - Raster Media',
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Hello ${body.name},</h2>
              ${isBooking 
                ? `<p>We have received your <strong>studio booking request</strong>.</p>
                   <p>Our team will check availability and <strong>confirm your booking within about 2 hours</strong>.</p>`
                : `<p>Thank you for reaching out to <strong>Raster Media</strong>.</p>
                   <p>We have successfully received your message. Our team will review your inquiry and get back to you soon.</p>`
              }
              <p>In the meantime, if you need to contact us sooner, reply to this email.</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `,
        });
      } catch (err) {
        console.error('Email failed to send:', err);
      }
    }

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
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
    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();
    const existing = await Inquiry.findById(id);
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    // Email customer only when admin moves from pending -> confirmed/rejected
    if (resend && existing && existing.status === 'pending' && (status === 'confirmed' || status === 'rejected')) {
      try {
        const isBooking = existing.type === 'booking';
        const to = existing.email;
        const from = 'Raster Media <info@rastermedia.lk>';

        await resend.emails.send({
          from,
          to,
          subject:
            status === 'confirmed'
              ? isBooking
                ? 'Booking Confirmed - Raster Media'
                : 'Message Approved - Raster Media'
              : isBooking
                ? 'Booking Update - Raster Media'
                : 'Message Update - Raster Media',
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Hello ${existing.name},</h2>
              ${
                status === 'confirmed'
                  ? isBooking
                    ? `<p>Your booking is confirmed.</p>
                       <p>Requested time: <strong>${existing.time || 'N/A'}</strong></p>`
                    : `<p>Thanks for reaching out. We have approved your message.</p>
                       <p>Our team will contact you shortly.</p>`
                  : isBooking
                    ? `<p>Unfortunately, we could not confirm your booking this time.</p>
                       <p>Requested time: <strong>${existing.time || 'N/A'}</strong></p>`
                    : `<p>Thanks for contacting Raster Media.</p>
                       <p>Unfortunately, we are unable to proceed with your request at this time.</p>`
              }
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `,
        });
      } catch (err) {
        console.error('Status-change email failed:', err);
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
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
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
