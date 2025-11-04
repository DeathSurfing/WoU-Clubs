import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { clubsData } from "../data/clubs"
import { eventsData } from "../data/events"
import { teamMembers } from "../data/student-council"

dotenv.config()

const uri = process.env.MONGO_URI
if (!uri) throw new Error("❌ MONGO_URI not found in .env file")

const client = new MongoClient(uri)

/**
 * Compress & convert to base64
 */
async function getCompressedBase64(filePath?: string): Promise<string | undefined> {
  if (!filePath) return undefined
  const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath
  const absPath = path.join(process.cwd(), "public", cleanPath)
  if (!fs.existsSync(absPath)) {
    console.warn(`⚠️ Image not found: ${absPath}`)
    return undefined
  }

  const buffer = await sharp(absPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toBuffer()

  const base64 = buffer.toString("base64")
  return `data:image/webp;base64,${base64}`
}

async function run() {
  try {
    await client.connect()
    const db = client.db("woxsen")

    const clubsCollection = db.collection("clubs")
    const eventsCollection = db.collection("events")
    const membersCollection = db.collection("studentcouncil")

    console.log("🧹 Clearing old data...")
    await Promise.all([
      clubsCollection.deleteMany({}),
      eventsCollection.deleteMany({}),
      membersCollection.deleteMany({}),
    ])

    console.log("📸 Compressing & embedding images...")

    const clubsWithBase64 = await Promise.all(
      clubsData.map(async (club) => ({
        ...club,
        image: await getCompressedBase64(club.image),
        coverImage: await getCompressedBase64(club.coverImage),
        gallery: club.gallery
          ? (await Promise.all(club.gallery.map(getCompressedBase64))).filter(Boolean)
          : [],
      }))
    )

    const eventsWithBase64 = await Promise.all(
      eventsData.map(async (event) => ({
        ...event,
        image: await getCompressedBase64(event.image),
      }))
    )

    const membersWithBase64 = await Promise.all(
      teamMembers.map(async (member) => ({
        ...member,
        photo: await getCompressedBase64(member.photo),
      }))
    )

    console.log("📦 Inserting data...")
    await clubsCollection.insertMany(clubsWithBase64)
    await eventsCollection.insertMany(eventsWithBase64)
    await membersCollection.insertMany(membersWithBase64)

    console.log("✅ Done!")
    console.log(`🏫 Clubs: ${clubsWithBase64.length}`)
    console.log(`📅 Events: ${eventsWithBase64.length}`)
    console.log(`👤 Members: ${membersWithBase64.length}`)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
  } finally {
    await client.close()
    console.log("🔒 MongoDB connection closed.")
  }
}

run()
