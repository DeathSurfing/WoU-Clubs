import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { clubsData } from "../data/clubs";
import { eventsData } from "../data/events";
import { teamMembers } from "../data/student-council";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env file");

const client = new MongoClient(uri);

// Load placeholder image & convert to Base64
const placeholderPath = path.join(process.cwd(), "assets", "placeholder.svg");
const fileBuffer = fs.readFileSync(placeholderPath);
const base64Placeholder =
  "data:image/svg+xml;base64," + fileBuffer.toString("base64");

async function run() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await client.connect();

    const db = client.db("woxsen");

    const clubsCollection = db.collection("clubs");
    const eventsCollection = db.collection("events");
    const membersCollection = db.collection("studentcouncil");

    console.log("🧹 Clearing old data...");
    await Promise.all([
      clubsCollection.deleteMany({}),
      eventsCollection.deleteMany({}),
      membersCollection.deleteMany({}),
    ]);

    console.log("🎨 Applying placeholder images (Base64)...");

    // --- Prepare Clubs ---
    const clubsWithImages = clubsData.map((club) => ({
      ...club,
      image: base64Placeholder,
      coverImage: base64Placeholder,
      gallery: club.gallery ? club.gallery.map(() => base64Placeholder) : [],
    }));

    // --- Prepare Events ---
    const eventsWithImages = eventsData.map((event) => ({
      ...event,
      image: base64Placeholder,
    }));

    // --- Prepare Student Council Members ---
    const membersWithImages = teamMembers.map((member) => ({
      ...member,
      photo: base64Placeholder,
    }));

    console.log("📦 Inserting data...");
    await clubsCollection.insertMany(clubsWithImages);
    await eventsCollection.insertMany(eventsWithImages);
    await membersCollection.insertMany(membersWithImages);

    console.log("✅ Seeding complete!");
    console.log(`🏫 Clubs inserted: ${clubsWithImages.length}`);
    console.log(`📅 Events inserted: ${eventsWithImages.length}`);
    console.log(`👤 Members inserted: ${membersWithImages.length}`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed.");
  }
}

run();
