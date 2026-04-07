import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../src/lib/mongodb';
import Project from '../../../../src/models/Project';
import Review from '../../../../src/models/Review';
import Inquiry from '../../../../src/models/Inquiry';
import CareerApplication from '../../../../src/models/CareerApplication';
import ModelApplication from '../../../../src/models/ModelApplication';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const [
      projectCount,
      pendingReviews,
      newContacts,
      newBookings,
      careerApps,
      modelApps
    ] = await Promise.all([
      Project.countDocuments(),
      Review.countDocuments({ verified: false }),
      Inquiry.countDocuments({ status: 'pending', type: 'contact' }),
      Inquiry.countDocuments({ status: 'pending', type: 'booking' }),
      CareerApplication.countDocuments({ status: 'pending' }),
      ModelApplication.countDocuments({ status: 'pending' })
    ]);

    return NextResponse.json({
      projectCount,
      pendingReviews,
      newInquiries: newContacts + newBookings,
      newBookings,
      newContacts,
      careerApps: careerApps + modelApps
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
