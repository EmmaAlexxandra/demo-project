import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const files = fs.existsSync(uploadDir)
    ? fs.readdirSync(uploadDir).filter(function (file) {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      })
    : [];

  return NextResponse.json({ images: files });
}
