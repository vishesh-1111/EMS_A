"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const deleteEvent = async (id, setEvents) => {
  try {
    const response = await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    const data = await response.json();
    setEvents((prevEvents) => prevEvents.filter(event => event._id !== id)); // Remove the event from the state
  } catch (err) {
    console.error("Error deleting the event:", err);
    alert('Error occurred while deleting the event');
  }

};

const Card = ({ event, user, setEvents }) => {
  return (
    <div className="card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      {user&&user.role=='user'&&(
      <Link href={`/event/${event._id}`} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        View
      </Link>
      )
 }

      {user && user.role === 'admin' && (
        <>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => deleteEvent(event._id, setEvents)} // Call deleteEvent here
          >
            Delete
          </button>

          <Link
            href={`/updevent/${event._id}`}
            className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Update
          </Link>
        </>
      )}
    </div>
  );
};
export default function RenderAllEvents({ user }) {
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
          <Card event={event} user={user} setEvents={setEvents} /> {/* Pass setEvents */}
        </ul>
      ))}
    </div>
  );
}