import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const goodFoodDir = path.join(process.cwd(), 'public/images/good_food');
  const badFoodDir = path.join(process.cwd(), 'public/images/bad_food');

  try {
    const goodFoodFiles = fs.readdirSync(goodFoodDir);
    const badFoodFiles = fs.readdirSync(badFoodDir);

    return NextResponse.json({ goodFood: goodFoodFiles, badFood: badFoodFiles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read image directories' }, { status: 500 });
  }
}
