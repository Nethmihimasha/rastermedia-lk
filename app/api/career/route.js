// app/api/career/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Career from '@/lib/models/Career';
import Model from '@/lib/models/Model';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { fullName, email, phone, position, experience, coverLetter, cvUrl } = body;

    if (!fullName || !email || !phone || !position || !experience || !cvUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const career = await Career.create({
      fullName,
      email,
      phone,
      position,
      experience,
      coverLetter,
      cvUrl,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received - ${position} at Raster Media`,
      html: `
        <h2>Thank you for your application!</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your application for the <strong>${position}</strong> position.</p>
        <p>Our team will review your application and get back to you soon.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Raster Media Team</strong></p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Career Application - ${position}`,
      html: `
        <h2>New Career Application Received</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>CV:</strong> <a href="${cvUrl}">View CV</a></p>
        ${coverLetter ? `<p><strong>Cover Letter:</strong> ${coverLetter}</p>` : ''}
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: career,
    });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application', details: error.message },
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
    const careers = await Career.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.error('Fetch careers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications', details: error.message },
      { status: 500 }
    );
  }
}

// Process a model registration (kept here to centralize notification + storage)
export async function processModelRegistration(body) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      instagramHandle,
      otherLinks,
      photos,
      categories,
      languages,
      portfolioLink,
      phone,
      country,
      age,
      gender,
      experience,
    } = body;

    if (!fullName || !email || !instagramHandle) {
      return NextResponse.json(
        { error: 'Missing required fields for model registration' },
        { status: 400 }
      );
    }

    const modelDoc = await Model.create({
      fullName,
      email,
      instagramHandle,
      otherLinks,
      photos: Array.isArray(photos) ? photos : [],
      categories: Array.isArray(categories) ? categories : [],
      languages: Array.isArray(languages) ? languages : [],
      portfolioLink,
      phone,
      country,
      age,
      gender,
      experience,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Confirmation to applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Model Registration Received - Raster Media`,
      html: `
        <h2>Thanks for registering as a model</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your model registration. Our casting team will review your submission and reach out if there's a fit.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Raster Media Team</strong></p>
      `,
    });

    // Notification to internal team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Model Registration - ${fullName}`,
      html: `
        <h2>New Model Registration</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Instagram:</strong> ${instagramHandle}</p>
        <p><strong>Categories:</strong> ${(categories || []).join(', ')}</p>
        <p><strong>Languages:</strong> ${(languages || []).join(', ')}</p>
        <p><strong>Portfolio:</strong> ${portfolioLink || 'N/A'}</p>
        <p><strong>Photos:</strong> ${(photos || []).map(p=>`<a href="${p}">photo</a>`).join(' | ')}</p>
      `,
    });

    return NextResponse.json({ success: true, data: modelDoc });
  } catch (error) {
    console.error('Model registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register model', details: error.message },
      { status: 500 }
    );
  }
}