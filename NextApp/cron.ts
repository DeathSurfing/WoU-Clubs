import cron from "node-cron";
import { google } from "googleapis";
import mongoose from "mongoose";
import { EventModel } from "./models/Event";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Google Sheets API with API Key
const sheets = google.sheets({
  version: "v4",
  auth: process.env.GOOGLE_API_KEY
});

// MongoDB Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://mongo:27017/woxsen");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Main function to fetch and store events
async function fetchAndStoreEvents() {
  if (!process.env.SHEET_ID) {
    console.error("❌ SHEET_ID environment variable is missing");
    return;
  }

  try {
    await connectToDatabase();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "A2:J",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("❌ No data found in Google Sheet");
      return;
    }

    let successCount = 0;
    for (const row of rows) {
      try {
        const eventData = {
          eventId: row[1],
          title: row[1],
          description: row[2],
          startDate: row[3],
          startTime: row[4],
          endTime: row[5],
          location: row[6],
          category: row[7],
          clubId: row[8],
          image: row[9],
        };

        await EventModel.findOneAndUpdate(
          { eventId: eventData.eventId },
          eventData,
          { upsert: true }
        );
        successCount++;
      } catch (error) {
        console.error(`❌ Error processing row: ${row}`, error);
      }
    }

    console.log(`✅ Successfully processed ${successCount}/${rows.length} events`);
  } catch (error) {
    console.error("❌ Error in fetchAndStoreEvents:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Handle container shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 Received SIGTERM. Closing connections...");
  await mongoose.disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("🛑 Received SIGINT. Closing connections...");
  await mongoose.disconnect();
  process.exit(0);
});

// Wrap in async IIFE to handle top-level await
(async () => {
  // Run immediately on startup if enabled
  if (process.env.RUN_ON_STARTUP === "true") {
    console.log("🔁 Running initial sync...");
    await fetchAndStoreEvents();
  }

  // Schedule daily execution at midnight
  console.log("⏰ Scheduling daily sync at midnight UTC");
  cron.schedule("0 0 * * *", () => {
    console.log("🔄 Running scheduled sync...");
    fetchAndStoreEvents();
  });
})();