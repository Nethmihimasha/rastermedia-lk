import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Project from '../../../src/models/Project';
import { getAdminSession } from '../../../src/lib/adminAuth';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    // Minimal server-side guardrails.
    if (!body?.title || !body?.client || !body?.category || !body?.image) {
      return NextResponse.json({ error: 'Missing required project fields' }, { status: 400 });
    }

    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, featured } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await dbConnect();

    if (typeof featured !== 'boolean') {
      return NextResponse.json({ error: 'featured must be a boolean' }, { status: 400 });
    }

    const updated = await Project.findByIdAndUpdate(id, { featured }, { new: true, runValidators: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await dbConnect();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
