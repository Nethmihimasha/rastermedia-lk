import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Review from '../../../src/models/Review';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    // Fetch only verified reviews for the frontend
    const reviews = await Review.find({ verified: true }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const newReview = await Review.create({
      name: body.name,
      email: body.email,
      text: body.text,
      rating: body.rating,
      verified: false, // Always false until admin approves
      createdAt: new Date(),
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
