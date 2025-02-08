"use client";

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@mui/material';
import { socket } from '../../../socket';
import {useRouter} from 'next/navigation'
 
import {CategorySharp,DescriptionTwoTone,Tag,LocationOnSharp} from '@mui/icons-material'
import {
  CircleDollarSign,
  CalendarCheck2,
  CalendarX2,
  MapPin,
  Link,
  ExternalLink,
  Users,
  Users2,
} from "lucide-react";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export default function EventPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [hasBooked, setHasBooked] = useState(null);
  const { id } = useParams();
  const queryclient = useQueryClient();
  const [isconnected,Setisconnected] = useState(false);
  const [totalReservations,setTotalReservations] = useState(null);
  const router = useRouter();
  console.log(totalReservations);
  console.log(hasBooked);

  const user = queryclient.getQueryData(['fetchuser']);
  console.log(user);

  useEffect(() => {
    if(!isconnected){
      socket.connect();
   }
    (async () => {
      try {
        console.log('Calling API...');
        const response = await fetch(`${serverUrl}/reservation/status/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      
        console.log(response)
        if (response.ok) {
          setHasBooked(true);
        } else {
          setHasBooked(false);
        }
      } catch (error) {
        console.error('Error fetching reservation status:', error);
        setHasBooked(false); // Handle errors gracefully
      }
    })();



    socket.on('connect',()=>{
      Setisconnected(true); 
      console.log('Admin socket connected:', socket.connected,socket.id); 
    });
   socket.on('reservationmade', () => {
     console.log('Admin received reservation event:');
       setTotalReservations((prev)=>prev+1);
     
       
      });
      

  
  socket.on('disconnect', () => {
    console.log('Admin disconnected:');
    Setisconnected(false);
  });

  return () => {
    socket.off('connect', ()=>{
      
    });
    socket.off('reservationmade', ()=>{
    
  });
  socket.off('disconnect', ()=>{
    
  });

};


}, []);

async function bookEvent() {
  if(!user||user.name==='guest'){
    return router.push('/login/user');
  }

  setIsBooking(true);
  (async()=>{
    await fetch(`${serverUrl}/reservation/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
  })();
  const response = await fetch(`${serverUrl}/events/update/${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    
    const result = await response.json();
    
    if(response.ok){
      socket.emit('reservationmade');
      setHasBooked(true); 
      setIsBooking(false);
      return result;
    }
    else {
      setIsBooking(false);
    }
  }
  
  
  
  
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
    setTotalReservations(result.reserved)
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
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.image.secure_url}
            alt="hero image"
            width={1000}
            height={1000}
            priority={true}
            loading='eager'
              className="h-full object-cover"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', textAlign: 'left', marginBottom: '1rem', borderBottom: '2px solid #32CD32', paddingBottom: '0.5rem' }}>
  {event.name}
</h2>


              <div className="flex flex-col bordergap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full px-5 py-2 border-2 border-neongreen">
                    {1 ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="border-2 p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category}
                  </p>
                </div>
              </div>
            </div>
            <Button
            disabled={hasBooked||isBooking}
            onClick={bookEvent}
  style={{
    background: 'linear-gradient(90deg, #32CD32, #00FF7F)',
    color: '#fff',
    padding: '0.75rem 2rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderRadius: '100px',
    boxShadow: '0 4px 8px rgba(50, 205, 50, 0.3)',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  }}
  onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 12px rgba(50, 205, 50, 0.5)')}
  onMouseLeave={(e) => (e.target.style.boxShadow = '0 4px 8px rgba(50, 205, 50, 0.3)')}
>
  {hasBooked?'Booked': isBooking?'Booking':'Book'}
</Button>
<div className="flex gap-3">
                    <Users2 />
                    <p>
                      {(totalReservations)}
                     
                    </p>
                  </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center gap-3">
                  <div className="flex gap-3">
                    <CalendarCheck2 />
                    <p>
                      {(event.date)}
                     
                    </p>
                  </div>

                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <MapPin />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p
  style={{
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    color: '#4A4A4A',
    padding: '0.5rem 0',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}
>
  {event.description}
</p>
              <div className="flex gap-3 mt-2">
                <a href={event.url} target="_blank" className="cursor-pointer">
                  <ExternalLink />
                </a>
                <a
                  href={event.url}
                  target="_blank"
                  className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer"
                >
                  More Information
                </a>
              </div>
            </div>

            <p className="text-left mt-2 sm:mt-0">
              Event organized by{" "}
              <span className="text-primary-500 font-bold">
                Adolf Hitler
              </span>
            </p>
          </div>
        </div>
      </section>

 
    </>
  );
     
  
}
