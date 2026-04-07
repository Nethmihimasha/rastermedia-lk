import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import CareerApplication from '../../../src/models/CareerApplication';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
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

    // Email notification to Admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Raster Media <notifications@rastermedia.lk>',
          to: 'info@rastermedia.lk',
          subject: `New Career Application: ${body.position} - ${body.fullName}`,
          html: `<p>Name: ${body.fullName}</p>
                 <p>Position: ${body.position}</p>
                 <p>CV: <a href="${body.cvUrl}">${body.cvUrl}</a></p>`
        });
      } catch (err) { console.error(err); }
    }

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
