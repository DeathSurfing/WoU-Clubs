#!/usr/bin/env node

const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");

// Enhanced environment loading
dotenv.config({ path: process.env.ENV_PATH || ".env" });

// Improved JSON validation
function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Invalid JSON:", jsonString);
    return null;
  }
}

// Enhanced sanitization
function sanitizeTimestampForId(timestamp) {
  if (!timestamp) return Date.now().toString();
  return timestamp.toString().replace(/\s+/g, "-").replace(/[:\/]/g, "");
}

// More robust time formatting
function formatTime(time) {
  if (!time) return "";
  
  // Handle already formatted times
  if (/^\d{2}:\d{2}$/.test(time)) return time;
  
  // Handle various time formats
  const timeParts = time.toString().match(/(\d{1,2}):?(\d{2})?\s?(AM|PM)?/i);
  if (!timeParts) return "";

  let [_, hours, minutes, period] = timeParts;
  hours = parseInt(hours, 10) || 0;
  minutes = minutes || "00";

  // 24-hour conversion
  if (period?.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (period?.toUpperCase() === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

// Enhanced date validation
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

async function fetchAndProcessEvents() {
  try {
    const sheetId = process.env.SHEET_ID;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!sheetId || !googleApiKey) {
      throw new Error("Missing required environment variables");
    }

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A2:L?key=${googleApiKey}`;
    
    // Enhanced request handling
    const response = await axios.get(apiUrl, {
      timeout: 10000,
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Validate response structure
    if (!response.data || !Array.isArray(response.data.values)) {
      throw new Error("Invalid API response structure");
    }

    const eventsData = response.data.values
      .map((row, index) => {
        try {
          // Validate required fields
          if (!row || row.length < 5) return null;
          
          const [
            timestamp,        // A
            title,           // B
            description,     // C
            startDate,       // D
            startTime,       // E
            endTime,         // F
            location = "TBA", // G (default)
            category = "General", // H (default)
            clubId = "",      // I
            image = "",       // J
            registerUrl = "", // K
            isFeaturedRaw     // L
          ] = row;

          // Validate required fields
          if (!startDate || !startTime || !endTime) return null;

          return {
            id: sanitizeTimestampForId(timestamp || `event-${index}`),
            title: title?.toString() || "Untitled Event",
            description: description?.toString() || "",
            startDate: formatDate(startDate),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            location: location.toString(),
            category: category.toString(),
            clubId: clubId.toString(),
            image: image.toString(),
            registerUrl: registerUrl.toString(),
            isFeatured: /true/i.test(isFeaturedRaw?.toString() || "")
          };
        } catch (e) {
          console.error(`Error processing row ${index + 2}:`, e);
          return null;
        }
      })
      .filter(Boolean);

    // Write output with validation
    const outputDir = "./data";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputContent = `// Auto-generated at ${new Date().toISOString()}
export const eventsData = ${JSON.stringify(eventsData, null, 2)} as const;

export type Event = typeof eventsData[number];
`;

    fs.writeFileSync(`${outputDir}/events.ts`, outputContent);
    console.log(`Successfully generated ${eventsData.length} events`);

  } catch (error) {
    console.error("Fatal error in fetchAndProcessEvents:", error);
    process.exit(1);
  }
}

// Execute with error handling
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});

fetchAndProcessEvents();