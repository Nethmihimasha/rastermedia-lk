import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Project from '../../../src/models/Project';

export async function GET() {
  try {
    await dbConnect();
    // Fetch only featured projects for the home page (or all if specified)
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const newProject = await Project.create({
      title: body.title,
      client: body.client,
      category: body.category,
      image: body.image, // URL from Cloudinary
      albumSlug: body.albumSlug,
      featured: body.featured || false,
      createdAt: new Date(),
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
