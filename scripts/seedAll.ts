import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { clubsData } from "../data/clubs";
import { eventsData } from "../data/events";
import { teamMembers } from "../data/student-council";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env file");

const client = new MongoClient(uri);

// Placeholder image for everything
const PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

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

    console.log("🎨 Applying placeholder images...");

    // --- Prepare Clubs ---
    const clubsWithImages = clubsData.map((club) => ({
      ...club,
      image: PLACEHOLDER,
      coverImage: PLACEHOLDER,
      gallery: club.gallery ? club.gallery.map(() => PLACEHOLDER) : [],
    }));

    // --- Prepare Events ---
    const eventsWithImages = eventsData.map((event) => ({
      ...event,
      image: PLACEHOLDER,
    }));

    // --- Prepare Student Council Members ---
    const membersWithImages = teamMembers.map((member) => ({
      ...member,
      photo: PLACEHOLDER,
    }));

    console.log("📦 Inserting data...");
    await clubsCollection.insertMany(clubsWithImages);
    await eventsCollection.insertMany(eventsWithImages);
    await membersCollection.insertMany(membersWithImages);

    console.log("✅ Seeding complete!");
    console.log(`🏫 Clubs inserted: ${clubsWithImages.length}`);
    console.log(`📅 Events inserted: ${eventsWithImages.length}`);
    console.log(`👤 Student Council members inserted: ${membersWithImages.length}`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed.");
  }
}

run();
