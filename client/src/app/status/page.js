"use client"
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
export default function RenderReservationStatus(){
  const [isconnected,Setisconnected] = useState(false);
  const [Reservations,setReservations]= useState(null);
  const [Changed ,setChanged ] = useState(0);
  
  useEffect(() => {
    console.log('triggered');
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservations/active');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        console.log(data);
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
  
    if(Reservations===null) fetchReservations(); 
    if(Changed===1){
       setChanged(0);
       fetchReservations();
    }

  }, [Reservations]); 
  useEffect(() => {
    if(!isconnected){
       socket.connect();
    }
    socket.on('connect',()=>{

      Setisconnected(true); 
      console.log('Admin socket connected:', socket.connected,socket.id); // Debugging connection status
      
      socket.on('admincall', (event, callback) => {
        console.log('reccc');
        console.log('Admin received reservation event:', event);
//        if(Reservations!==null){
          console.log('live',Reservations);
          setReservations(prevReservations => [...prevReservations, event]);
  //      }
      });
      
      socket.on('reservationUpdated', (updatedReservation) => {

        console.log('Received updated reservation:', updatedReservation);
  
        // Update the reservations state based on the updated reservation
        setReservations(prevReservations => {
          console.log('prev',prevReservations);
          return prevReservations.map(reservation =>
            reservation._id === updatedReservation._id ? updatedReservation : reservation
          );
        });
      });
    });


    return () => {
      socket.disconnect();
      socket.on('disconnect', () => {
        console.log('Admin disconnected:');
        Setisconnected(false);
      });

    };
  }, []);



   if(Reservations===null){
     return (
       <div>
        Loading...
    </div>
   )
  }     
  
  if(Reservations.length===0){
    return (
      <div>
       No Ongoing Reservations
   </div>
  )
 }     
 
 
 
   
 return (

<div>
  {console.log('hello', Reservations)}
  <div className="space-y-4 p-5"> {/* Container with vertical space between items */}
    {Reservations.map((r) => (
      <div key={r._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex-1 text-center text-gray-800 font-semibold">{r._id}</div>
        <div className="flex-1 text-center text-gray-800">{r.status}</div>
        <div className="flex-1 text-center text-gray-800">{r.userid}</div>
        <div className="flex-1 text-center text-gray-800">{r.standardTickets}</div>
        <div className="flex-1 text-center text-gray-800">{r.vipTickets}</div>
        <div className="flex-1 text-center text-gray-800">{r.reservationDate}</div>
      </div>
    ))}
  </div>
</div>

  );
   
}