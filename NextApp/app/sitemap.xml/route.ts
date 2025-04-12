// app/sitemap.xml/route.ts

import { NextResponse } from 'next/server';
import { clubsData } from '@/data/clubs';

const DOMAIN = 'https://woxsenstudentcouncil.com';

export async function GET() {
  const staticRoutes = ['', 'clubs', 'student-council', 'contact'];

  const staticUrls = staticRoutes.map(
    (route) => `
      <url>
        <loc>${DOMAIN}/${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${route === '' ? 1.0 : 0.8}</priority>
      </url>
    `
  );

  const clubUrls = clubsData.map(
    (club) => `
      <url>
        <loc>${DOMAIN}/clubs/${club.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls.join('')}
      ${clubUrls.join('')}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
