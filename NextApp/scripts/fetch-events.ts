#!/usr/bin/env node

// Required modules
const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Utility function to format the timestamp into a sanitized ID
function sanitizeTimestampForId(timestamp) {
  return timestamp.replace(/\s+/g, "-").replace(/[:\/]/g, "");
}

// Utility function to format time into HH:mm (24-hour format)
function formatTime(time) {
  const [hours, minutes] = time.split(/[:\s]+/);
  const period = time.match(/AM|PM/i)?.[0];
  let hour = parseInt(hours, 10);

  if (period?.toUpperCase() === "PM" && hour !== 12) {
    hour += 12; // Convert to 24-hour format
  }
  if (period?.toUpperCase() === "AM" && hour === 12) {
    hour = 0; // Midnight case
  }

  return `${String(hour).padStart(2, "0")}:${minutes}`;
}

// Function to parse the JSON response and generate eventsData
async function fetchAndProcessEvents() {
  try {
    // Extract environment variables
    const sheetId = process.env.SHEET_ID;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!sheetId || !googleApiKey) {
      throw new Error("Missing SHEET_ID or GOOGLE_API_KEY in environment variables.");
    }

    // Construct the API URL using environment variables
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A2:K?key=${googleApiKey}`;

    // Fetch the JSON response from the Google Sheets API
    const response = await axios.get(apiUrl);

    // Extract the rows from the response
    const rows = response.data.values || [];

    // Map the rows to the desired Event structure
    const eventsData = rows.map((row, index) => {
      const [
        timestamp,
        title,
        description,
        startDate,
        startTime,
        endTime,
        location,
        category,
        clubId,
        image,
        registerUrl,
        isFeaturedRaw,
      ] = row;

      // Parse the ISFEATURED field as a boolean
      const isFeatured = ["true", "TRUE"].includes(isFeaturedRaw?.trim());

      return {
        id: sanitizeTimestampForId(timestamp), // Sanitized timestamp as ID
        title,
        description,
        startDate: new Date(startDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        location,
        category,
        clubId,
        image,
        registerUrl, // Include the registration URL
        isFeatured, // Use the parsed boolean value
      };
    });

    // Write the output to a TypeScript file
    const outputFilePath = "./data/events.ts";
    const outputContent = `export const eventsData = ${JSON.stringify(eventsData, null, 2)};\n`;

    fs.writeFileSync(outputFilePath, outputContent);
    console.log(`Generated eventsData.ts successfully at ${outputFilePath}`);
  } catch (error) {
    console.error("Error fetching or processing events:", error.message);
  }
}

// Main execution
fetchAndProcessEvents();