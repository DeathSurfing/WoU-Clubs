import cron from "node-cron";
import { google } from "googleapis";
import { connectToDatabase } from "./lib/mongo";
import { EventModel } from "./models/Event";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const SHEET_ID = process.env.SHEET_ID!;
const RANGE = "A2:J"; // Adjusted range for new columns
const CREDENTIALS_FILE = path.join(process.cwd(), "service-account.json");

async function fetchAndStoreEvents() {
  try {
    await connectToDatabase();
    
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_FILE,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || !rows.length) {
      console.log("❌ No data found.");
      return;
    }

    const events = rows.map((row) => ({
      eventId: row[1], // Event Title as ID (assuming unique)
      title: row[1], // Event Title
      description: row[2], // Event Description
      startDate: row[3], // Event Start Date
      startTime: row[4], // Event Start Time
      endTime: row[5], // Event End Time
      location: row[6], // Event Location
      category: row[7], // Event Category
      clubId: row[8], // Club ID
      image: row[9], // Event Image URL
    }));

    for (const event of events) {
      await EventModel.findOneAndUpdate({ eventId: event.eventId }, event, { upsert: true });
    }

    console.log("✅ Events updated successfully in MongoDB!");
  } catch (error) {
    console.error("❌ Error fetching or storing events:", error);
  }
}

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running daily event update...");
  await fetchAndStoreEvents();
});

console.log("⏰ CRON Job Scheduled: Running every day at midnight.");
