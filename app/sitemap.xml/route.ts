// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { clubsData } from '@/data/clubs';
import { eventsData } from '@/data/events';
import { isAfter, parseISO } from 'date-fns';

const DOMAIN = 'https://woxsenstudentcouncil.com';

export async function GET() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Student Council", path: "/student-council" },
    { name: "Clubs", path: "/clubs" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Oval Menu", path: "/nutrition" },
  ];

  // Generate static URLs from navItems
  const staticUrls = navItems.map(
    (item) => `
      <url>
        <loc>${DOMAIN}${item.path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${item.path === '/' ? 1.0 : 0.8}</priority>
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

  const eventUrls = eventsData
    // Only include upcoming events or recent past events (last 3 months)
    .filter(event => {
      const eventDate = parseISO(event.startDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return isAfter(eventDate, threeMonthsAgo);
    })
    .map(
      (event) => `
        <url>
          <loc>${DOMAIN}/events/${event.id}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls.join('')}
      ${clubUrls.join('')}
      ${eventUrls.join('')}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}