// app/api/review/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, rating, reviewText } = body;

    if (!name || !email || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const review = await Review.create({
      name, email, rating, reviewText,
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
      subject: 'Thank You for Your Review - Raster Media',
      html: `
        <h2>Thank you for your review!</h2>
        <p>Dear ${name},</p>
        <p>We appreciate you taking the time to share your experience with us.</p>
        <p>Your review will be visible on our website after approval.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Raster Media Team</strong></p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Review Submitted - ${rating} Stars`,
      html: `
        <h2>New Review Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${'⭐'.repeat(rating)}</p>
        <p><strong>Review:</strong></p>
        <p>${reviewText}</p>
        <br>
        <p><em>Please approve or reject this review in the admin panel.</em></p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
    });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const visible = searchParams.get('visible');

    const filter = {};
    if (status) filter.status = status;
    if (visible === 'true') filter.isVisible = true;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    );
  }
}