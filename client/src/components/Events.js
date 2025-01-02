"use client"
import { useQuery } from '@tanstack/react-query';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import { Box } from '@mui/material'
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import CardActionArea from '@mui/material/CardActionArea';
import React, { useState, useEffect } from 'react';
import CardHeader from "@mui/material/CardHeader";

import Image from 'next/image';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
import  dumbtoji from'@/styles/images/eventimages/dumbtoji.jpg'
import  toji from'@/styles/images/eventimages/toji.jpg'
import Link from 'next/link';
import PageLoader from './PageLoader';
const deleteEvent = async (id, setEvents) => {
  try {
    const response = await fetch(`${serverUrl}/events/${id}`, {
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
export function EventCard({ event, user, setEvents, deleteEvent },) {
  return (
    <div suppressHydrationWarning={true}>

    <Card sx={{ maxWidth: 340, display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Box containing the CardMedia and CardContent */}
      <Box sx={{ flexGrow: 1 }}>
        <CardActionArea>
          <Link href={`/event/${event._id}`} passHref>
          
            <CardMedia
              component="img"
              height="140" // Adjust the height of the image
              image={toji.src}
              alt="logo"
              sx={{ cursor: 'pointer' }}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2, // Truncate to 2 lines
              }}
              >
              {event.description}
            </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
      </Box>

      {/* Box containing the action buttons */}
      <CardActionArea>

      <Box 
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        borderTop: '1px solid #ddd',
        marginTop: 'auto', // Ensures this Box is pushed to the bottom
      }}
      >
        {user.role === 'user' && (
          <Button size="medium" href={`event/${event._id}`}>
            View
          </Button>
        )}
        {user.role === 'admin' && (
          <Button size="medium" href={`/updevent/${event._id}`}>
            Update
          </Button>
        )}
        {user.role === 'admin' && (
          <Button size="medium"  onClick={() => deleteEvent(event._id, setEvents)}>
            Delete
    
          </Button>
        )}
      </Box>

</CardActionArea>
    </Card>
</div>
  );
}

export default function RenderAllEvents({ user }) {
  const fetchEvents = async () => {
    console.log('fetching data events');
    const response = await fetch(`${serverUrl}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  };

  const { data: events, isLoading, isError, error } = useQuery({
    queryFn: fetchEvents, 
    queryKey: ['fetchevents'],
    staleTime : Infinity,
    });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div suppressHydrationWarning={true}>
      <h1 className="mt-5 text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-3 gap-4 justify-between">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}