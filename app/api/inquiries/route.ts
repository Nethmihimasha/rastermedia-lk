import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Inquiry from '../../../src/models/Inquiry';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
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

    // 📧 Dual Email Notifications
    if (process.env.RESEND_API_KEY) {
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

        // 2. External Confirmation (to the Client)
        await resend.emails.send({
          from: 'Raster Media <info@rastermedia.lk>',
          to: body.email,
          subject: `${isBooking ? 'Booking Received' : 'Thanks for contacting'} - Raster Media`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; border: 1px solid #eee;">
              <h1 style="color: #5DCDDB;">Raster Media</h1>
              <h2>Hello ${body.name},</h2>
              <p>Thank you for reaching out to us. We have received your ${isBooking ? 'studio booking request' : 'message'}.</p>
              <p>Our team will review the details and get back to you shortly.</p>
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">© 2026 Raster Media. All rights reserved.</p>
            </div>
          `
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
    const { id, status } = await request.json();
    await dbConnect();
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await dbConnect();
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
