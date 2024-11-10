"use client";
import { useState, useEffect } from "react";


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

function RenderEvent({ bookedticket }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await fetchEventData(bookedticket.eventid);
      setEvent(eventData);
    };

    fetchEvent();
  }, [bookedticket.event]);  

  if (!event) {
    return <div>Loading event...</div>; 
  }

  return (
    <div>
      <p>{event.name}</p>
      <button className="border rounded">view</button>
    </div>
  );
}

function RenderDashboard({ history }) {
  if(!history){
    return(
      <h1>No Active Bookings yet</h1>
    );
  }
  return (
    <div>
      {history.map((bookedticket) => (
        <RenderEvent key={bookedticket._id} bookedticket={bookedticket} />
      ))}
    </div>
  );
}

export default function Dashboard({user}) {

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('histroy')
    const fetchBookings = async () => {
      console.log('fetchboks');
      const response = await fetch("http://localhost:5000/bookings", {
        method: "GET",
        credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const result = await response.json()
          setHistory(result);
        } 
        setLoading(false);
      };
      
      fetchBookings();
    }, []);
    
    console.log(history);
    if (user===null) {
      return (
        <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <div>
          <h2>Welcome</h2>
          <h2>Please log in to access your dashboard</h2>
        </div>
        </div>
      );
    }
    if (loading) {
      return <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        Loading.....
        </div>;
    }
    
  if (history === null) {
    return <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      No history available
      </div>;
  }
  
  return (
    <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      
      <h2 >  Dashboard</h2>
      <h1> Welcome {user.name} Here is your Booked ticket history</h1>
      <RenderDashboard history={history} />
    </div>
  );
}
