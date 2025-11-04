// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
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

  // 🧭 Static pages
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

  let clubUrls: string[] = [];
  let eventUrls: string[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("woxsen");

    // 🏛 Clubs
    const clubs = await db.collection("clubs").find({}).toArray();
    clubUrls = clubs.map(
      (club) => `
        <url>
          <loc>${DOMAIN}/clubs/${club.slug || club._id}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
    );

    // 🎉 Events
    const events = await db.collection("events").find({}).toArray();

    const filteredEvents = events.filter(event => {
      if (!event.startDate) return false;
      const eventDate = parseISO(event.startDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return isAfter(eventDate, threeMonthsAgo);
    });

    eventUrls = filteredEvents.map(
      (event) => `
        <url>
          <loc>${DOMAIN}/events/${event.slug || event._id}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `
    );

  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }

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
