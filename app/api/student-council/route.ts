import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("woxsen");

    const members = await db
      .collection("studentcouncil")
      .find()
      .project({
        // 🔹 Core Identifiers
        _id: 1,
        id: 1, // unique slug
        name: 1,
        fullName: 1,
        rollNumber: 1,
        email: 1,
        phoneNumber: 1,

        // 🔹 Academic / Department Info
        department: 1,
        departmentCode: 1,
        specialization: 1,
        year: 1,
        semester: 1,
        section: 1,
        hostelBlock: 1,
        roomNumber: 1,

        // 🔹 Council Roles
        role: 1,
        positionTitle: 1,
        designation: 1,
        team: 1,
        category: 1, // “Core Team”, “Board Member”, etc.
        committee: 1,
        responsibilities: 1,
        tags: 1, // e.g. ["Leadership", "Tech", "Events"]

        // 🔹 Media & Visuals
        photo: 1,
        coverImage: 1,
        bannerImage: 1,
        backgroundImage: 1,
        thumbnail: 1,
        imageCdnUrl: 1,
        photoPosition: 1,

        // 🔹 Bio, Quotes & Highlights
        bio: 1,
        description: 1,
        quote: 1,
        motto: 1,
        achievements: 1,
        awards: 1,
        highlights: 1,
        notableProjects: 1,
        initiatives: 1,
        contributions: 1,

        // 🔹 Social Media & Contact Links
        linkedin: 1,
        twitter: 1,
        instagram: 1,
        github: 1,
        portfolio: 1,
        personalWebsite: 1,
        youtube: 1,
        emailPublic: 1,
        socials: 1, // nested object { linkedin, twitter, etc. }

        // 🔹 System Metadata
        createdAt: 1,
        updatedAt: 1,
        createdBy: 1,
        updatedBy: 1,
        verified: 1,
        isActive: 1,
        isFeatured: 1,
        priority: 1,
        sortOrder: 1,
        lastLogin: 1,

        // 🔹 Engagement Metrics
        views: 1,
        likes: 1,
        followers: 1,
        endorsements: 1,
        influenceScore: 1,

        // 🔹 Optional Extended Fields
        skills: 1,
        interests: 1,
        hobbies: 1,
        languages: 1,
        certifications: 1,
        experience: 1,
        education: 1,
        projects: 1,
        volunteering: 1,
        publications: 1,
        eventsLed: 1,
        eventsParticipated: 1,
      })
      .sort({ sortOrder: 1, photoPosition: 1 })
      .toArray();

    return NextResponse.json(members);
  } catch (err) {
    console.error("[StudentCouncil API Error]", err);
    return NextResponse.json(
      { error: "Failed to fetch student council" },
      { status: 500 }
    );
  }
}
