"use client";
import { useEffect, useState } from "react";

interface Event {
  eventId: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  clubId: string;
  image: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      {events.length === 0 ? (
        <p>Loading...</p>
      ) : (
        events.map((event) => (
          <div key={event.eventId} className="p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.startDate}</p>
            <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Club:</strong> {event.clubId}</p>
            <img src={event.image} alt={event.title} className="w-48 h-32 object-cover mt-2" />
          </div>
        ))
      )}
    </div>
  );
}
