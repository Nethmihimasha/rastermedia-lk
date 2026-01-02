// app/api/contact/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { fullName, email, phone, company, projectType, message } = body;

    // Validation
    if (!fullName || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await Contact.create({
      fullName, 
      email, 
      phone, 
      company, 
      projectType, 
      message,
    });

    // Create transporter - FIXED: Use nodemailer.createTransport (not createTransporter)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - Raster Media',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <br>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Raster Media Team</strong></p>
      `,
    });

    // Send notification email to admin
    const projectTypeLabels = {
      'branding': 'Branding',
      'web-development': 'Web Development',
      'photography': 'Photography',
      'video-production': 'Video Production',
      'digital-marketing': 'Digital Marketing',
      'other': 'Other',
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Inquiry - ${projectTypeLabels[projectType]}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Project Type:</strong> ${projectTypeLabels[projectType]}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error.message },
      { status: 500 }
    );
  }
}