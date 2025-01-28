"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import GlassIcon from '@mui/icons-material/LocalBar';
import Link from 'next/link'
import {CategorySharp,DescriptionTwoTone,Tag,LocationOnSharp} from '@mui/icons-material'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchsessionData(id) {
  const response = await fetch(`${serverUrl}/reservations/event/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if(response.ok)return result;
  else return null;
}

export default function EventPage() {
  const [existingSession,setExistingSession] = useState(null);
  const [standardTickets, setStandardTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [cost, setCost] = useState(0);
  const [isBooking, setIsBooking] = useState(false); // New state to track booking status
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);

  async function fetchEventData() {
    console.log('fettchinggg');
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
  const { data: event, isLoading, isError, error } = useQuery({
    queryFn: fetchEventData, 
    queryKey:[`${id}`],
    staleTime: 1000*60*10, 
    cacheTime: 1000*60*20 
  });
  
  if(isLoading){
    return(
      <div>
        Loading..
      </div>
    )
  }
  return (
    
    <div className="mt-1">
      
      <div className="relative">
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="https://picsum.photos/seed/picsum/1800/400"
    alt={event.name}
    layout="fill"
    objectFit="cover"
    className="opacity-70" // Slightly dim the background
  />
</div>

<div className="absolute inset-0 p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center">
  <div className="md:w-1/3 mr-4 md:mr-4">  {/* Adjust the margin here */}
    <Image
      src='https://picsum.photos/seed/seed/400/500'
      alt={event.name}
      width={300}
      height={450}
      className="rounded-lg shadow-lg"
    />

  </div>
  <div className="md:w-2/3 text-white">
    <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
    <div className="flex items-center mb-2">
      <span className="text-black mr-2">{event.rating}</span>

    </div>
    <p className="mb-4 text-black">{event.language}</p>
    <p className="mb-4 text-black">
     <LocationOnSharp/>
      {event.location} 
    </p>
    <p className="mb-4 text-black">
      <HourglassEmptyIcon />
      {event.duration||"3 hrs"} 
    </p>
    <p className='mb-4 text-black'> 
    <CalendarTodayIcon />
    {event.startTime.slice(0,10)} 
    </p>
    <p className='mb-4 text-black'> 
    <CategorySharp />
    {event.category} 
    </p>
    {/* <button 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={()=>{
      <Link href={'/'}>
      </Link>
    }}
    >
    
      Book tickets
    </button> */}
    <Link href={`/seatmap/${event._id}`}>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
    >
     Book tickets
    </button>
    </Link>
  </div>
</div>

      </div>
      <div className="bg-white p-8 md:p-16">
        <div >
          <Tag fontSize='48px'></Tag>
          {event.tags||"Pop,Gen-z"}
        </div>
        <h2 className="text-2xl font-bold mb-4">About the Event</h2>
        <p className="text-gray-700 leading-relaxed">
          <DescriptionTwoTone/>
          {showMore ? event.description : event.description.slice(0, 30)}
          <button onClick={() => setShowMore(!showMore)} className="text-blue-500 ml-1">
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </p>
      </div>

   
    </div>
  );
     
  
}
