import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  clubId: { type: String, required: true },
  image: { type: String, required: true },
});

export const EventModel = mongoose.models.Event || mongoose.model("Event", EventSchema);


