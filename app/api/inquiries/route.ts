import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Inquiry from '../../../src/models/Inquiry';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email notification to Admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'info@rastermedia.lk',
          subject: `New ${body.type.toUpperCase()} Inquiry from ${body.name}`,
          html: `<p>Name: ${body.name}</p>
                 <p>Email: ${body.email}</p>
                 <p>Message: ${body.message}</p>`
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
