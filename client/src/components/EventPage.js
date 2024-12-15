"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchEventData(id) {
  const response = await fetch(`${serverUrl}/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();
  return result;
}
export default function EventPage() {
    const [event, setEvent] = useState(null); 
    const { id } = useParams(); 


  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await fetchEventData(id);
      setEvent(eventData);
    };

    fetchEvent();
  }, []);  

  if (!event) {
    return <div>Loading event...</div>; 
  }

  return (
    <div>
      <p>{event.name}</p>
      <p>{event.description}</p>
    </div>
  );

}

 


