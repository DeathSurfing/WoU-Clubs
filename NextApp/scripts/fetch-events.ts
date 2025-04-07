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
  if (!time) return ""; // Handle missing time gracefully
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
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A2:L?key=${googleApiKey}`;

    // Fetch the JSON response from the Google Sheets API
    const response = await axios.get(apiUrl);

    // Extract the rows from the response
    const rows = response.data.values || [];

    // Map the rows to the desired Event structure
    const eventsData = rows
      .filter(row => row.length > 0 && row[0]) // Filter out empty rows or rows without a timestamp
      .map((row, index) => {
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
          isFeaturedRaw, // Column L (12th column)
        ] = row;

        // Skip rows with missing required fields
        if (!timestamp || !startDate || !startTime || !endTime) {
          console.warn(`Skipping invalid row at index ${index + 2}`); // +2 because data starts at A2
          return null;
        }

        // Parse the ISFEATURED field as a boolean
        const isFeatured =
          typeof isFeaturedRaw === "string" &&
          ["true", "TRUE"].includes(isFeaturedRaw.trim());

        return {
          id: timestamp 
            ? sanitizeTimestampForId(timestamp) 
            : `event-${index}`, // Fallback ID using row index
          title: title || "Untitled Event",
          description: description || "",
          startDate: new Date(startDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
          startTime: formatTime(startTime),
          endTime: formatTime(endTime),
          location: location || "TBA",
          category: category || "General",
          clubId: clubId || "Unknown Club",
          image: image || "",
          registerUrl: registerUrl || "", // Include the registration URL
          isFeatured: isFeatured, // Use the parsed boolean value
        };
      })
      .filter(event => event !== null); // Remove skipped rows

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