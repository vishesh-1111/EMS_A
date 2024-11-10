"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
const Card = ({event}) => {
    return (
      <div className="card">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <Link href={`/event/${event._id}`} className="view-button">
              View
            </Link>
    </div>
    );
  };
export default function RenderAllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
      <div>
      <h1>Upcoming Events</h1>
          
          {events.map((event) => (
            <ul key={event._id}>
             <Card 
              event={event}
             ></Card>
          </ul>
          ))}
        
    </div>
  );
}
