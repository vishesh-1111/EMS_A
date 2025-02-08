"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box, TextField } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CardActionArea from '@mui/material/CardActionArea';
import React, { useState } from 'react';
import CardHeader from "@mui/material/CardHeader";
import Image from 'next/image';
import Link from 'next/link';
import PageLoader from './PageLoader';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const deleteEventRequest = async (id) => {
  const response = await fetch(`${serverUrl}/events/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }

};

export function EventCard({idx,event, user, onDelete }) {
  let count =  1;
  return (
    <Card sx={{maxWidth: 340, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <CardActionArea>
          <Link href={`/event/${event._id}`} passHref>
            <CardMedia
              component="img"
              height="140"
              fetchPriority='auto'
               src={event.image.secure_url} 
              alt="Event image"
              sx={{
                cursor: 'pointer',
                objectFit: 'cover', // or 'contain' if you prefer no cropping
                width: '100%'
              }}
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
                  WebkitLineClamp: 2,
                }}
              >
                {event.description}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Box>
      <CardActions sx={{ justifyContent: 'space-between', padding: 1, borderTop: '1px solid #ddd', marginTop: 'auto' }}>
        {user.role === 'user' && (
          <Button size="medium" href={`event/${event._id}`}>
            View
          </Button>
        )}
        {user.role === 'admin' && (
          <>
            <Button size="medium" href={`/updevent/${event._id}`}>
              Update
            </Button>
            <Button size="medium" onClick={() => onDelete(event._id)}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default function RenderAllEvents({ user }) {
  const queryClient = useQueryClient();
  const [textSearch, setTextSearch] = useState('');

  const fetchEvents = async () => {
    const response = await fetch(`${serverUrl}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  };

  const { data: events, isLoading, isError, error } = useQuery({
    queryFn: fetchEvents,
    queryKey: ['Events'],
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEventRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['Events']);  // Refetch events after deletion
    },
    onError: (err) => {
      console.error("Error deleting the event:", err);
      alert('Error occurred while deleting the event');
    },
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(textSearch.toLowerCase()) ||
    event.date.toLowerCase().includes(textSearch.toLowerCase()) ||
    event.category.toLowerCase().includes(textSearch.toLowerCase())
  );

  return (
    <div suppressHydrationWarning={true}>
      <h1 className="mt-5 text-2xl font-bold mb-4">Upcoming Events</h1>
      <TextField
        label="Search Events"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 justify-between">
        {filteredEvents.map((event,idx) => (
          <EventCard
            idx={idx}
            key={event._id}
            event={event}
            user={user}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  );
}
