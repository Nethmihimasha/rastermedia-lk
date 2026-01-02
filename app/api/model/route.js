// app/api/model/route.js
import { NextResponse } from 'next/server';
import { processModelRegistration } from '../career/route';

export async function POST(request) {
  try {
    const body = await request.json();
    return await processModelRegistration(body);
  } catch (error) {
    console.error('Model route wrapper error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
