"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BookEvent from '../../../components/BookEvent';

async function fetchEventData(id) {
  const response = await fetch(`http://localhost:5000/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();
  return result;
}
async function fetchsessionData(id) {
  const response = await fetch(`http://localhost:5000/reservations/event/${id}`, {
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

export default function EventPage({}) {
  const [existingSession,setExistingSession] = useState(null);
  const [event, setEvent] = useState(null);
  const [standardTickets, setStandardTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [cost, setCost] = useState(0);
  const [isBooking, setIsBooking] = useState(false); // New state to track booking status
  const { id } = useParams();
  

  useEffect(() => {
    const fetchSession = async () => {
      const eventSessiondata = await fetchsessionData(id);
      setExistingSession(eventSessiondata);
    };
    fetchSession();

  }, []); 

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await fetchEventData(id);
      setEvent(eventData);
    };

    fetchEvent();
  }, []); 


  const handleStandardTicketChange = (e) => {
    const value = Math.min(e.target.value, availableSeats()); 
    setCost(value * event.ticketprice.standard + vipTickets * event.ticketprice.vip);
    setStandardTickets(value);
  };

  const handleVipTicketChange = (e) => {
    const value = Math.min(e.target.value, availableSeats()); 
    setVipTickets(value);
    setCost(value * event.ticketprice.vip + standardTickets * event.ticketprice.standard);
  };

  const availableSeats = () => {
    return event.totalseats - event.reservedSeats;
  };

  const Handlebooking = () => {
    const totalTickets = standardTickets + vipTickets;
    if (totalTickets <= 0) {
      alert('Please select at least one ticket');
      return;
    }
    if (totalTickets > 5) {
      alert('You cannot book more than 5 tickets at once');
      return;
    }

    // Set booking status to true when "Book" is clicked
    setIsBooking(true);
  };

  if (!event) {
    return <div>Loading event...</div>;
  }

  if(existingSession){
    const expiredDate = new Date(existingSession.expiresAt).getTime();
    const currentDate =  Date.now();

    console.log(currentDate,expiredDate);
    const differenceInMilliseconds = expiredDate - currentDate;
    const remainingSeconds = Math.max(0, differenceInMilliseconds / 1000);

    return(
      <BookEvent event={event} cost={existingSession.cost}
       vipTickets={existingSession.vipTickets} 
       standardTickets={existingSession.standardTickets}
       remainingSeconds = {remainingSeconds}
       userReservation = {existingSession}
       />
    )
  }



  return (
    <div style={{ marginTop: '40px', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <p>Title: {event.name}</p>
      <p>Category: {event.category}</p>
      <p>Location: {event.location}</p>
      <p>Standard ticket: {event.ticketprice.standard}$</p>
      <p>VIP ticket: {event.ticketprice.vip}$</p>
      <p>Available seats: {availableSeats()}</p>

      <div style={{ border: '1px solid #e2e8f0', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
        <div>
          <label>Select Standard Tickets: </label>
          <input
            type="number"
            value={standardTickets}
            onChange={handleStandardTicketChange}
            min={0}
            max={availableSeats()}
            style={{ padding: '8px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Select VIP Tickets: </label>
          <input
            type="number"
            value={vipTickets}
            onChange={handleVipTicketChange}
            min={0}
            max={availableSeats()}
            style={{ padding: '8px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f7fafc', borderRadius: '8px' }}>
        <p>{event.description}</p>
        <button
          onClick={Handlebooking}
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            backgroundColor: '#6B46C1',
            color: '#fff',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            border: 'none'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#805ad5'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6B46C1'}
        >
          Book
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f7fafc', borderRadius: '8px' }}>
        <strong>Cost:</strong> {cost} + GST
      </div>

      {isBooking && (
        <div style={{ marginTop: '20px' }}>
          <BookEvent event={event} cost={cost} vipTickets={vipTickets} standardTickets={standardTickets}/>
        </div>
      )}
    </div>
  );
}
