import { NextResponse } from 'next/server';
import dbConnect from '../../../../src/lib/mongodb';
import Review from '../../../../src/models/Review';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const totals = await Review.aggregate([
      { $match: { verified: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
    ]);

    const byRating: Record<string, number> = {};
    for (const row of totals) {
      if (row && row._id != null) byRating[String(row._id)] = Number(row.count) || 0;
    }

    const total = [1, 2, 3, 4, 5].reduce((acc, star) => acc + (byRating[String(star)] || 0), 0);
    const dist = [5, 4, 3, 2, 1].map((stars) => {
      const count = byRating[String(stars)] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return { stars, count, percentage };
    });

    return NextResponse.json({ totalCount: total, distribution: dist });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch review stats' }, { status: 500 });
  }
}

