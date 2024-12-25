"use client"
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import Reservation from '../../components/Reservation.js'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function RenderReservationStatus(){
  const [isconnected,Setisconnected] = useState(false);
  const [Reservations,setReservations]= useState(null);
  const [admin,setAdmin] = useState(false);

  

    
   
  useEffect(() => {
    console.log('triggered');
    if(!isconnected){
      socket.connect();
   }
   const fetchReservations = async () => {
    try {

      const response = await fetch(`${serverUrl}/reservations/active`,{
        method : 'GET',
        credentials : 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      console.log(data);
      setReservations(data);
      setAdmin(true);
    } catch (error) {
      //console.error('Error fetching reservations:', error);
    }

  };
    
   
   if(!Reservations) fetchReservations();
    
      socket.on('connect',()=>{
        Setisconnected(true); 
        console.log('Admin socket connected:', socket.connected,socket.id); 
      });
     socket.on('reservationmade', (event) => {
       console.log('reccc');
       console.log('Admin received reservation event:', event);
       
       console.log('live',Reservations);
         setReservations(prevReservations => [...prevReservations, event]);
         console.log('reservations',Reservations)

        });
        
        
        socket.on('reservationexpired', (updatedReservation) => {
          
          console.log('Received updated reservation:', updatedReservation);
          
          setReservations(prevReservations => {
            console.log('prev',prevReservations);
            return prevReservations.map(reservation =>
              reservation._id === updatedReservation._id ? updatedReservation : reservation
            );
          });
    });
    socket.on('reservationsuccess', (updatedReservation) => {

      console.log('Received updated reservation:', updatedReservation);
      
      setReservations(prevReservations => {
        console.log('prev',prevReservations);
        return prevReservations.map(reservation =>
          reservation._id === updatedReservation._id ? updatedReservation : reservation
        );
      });
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
    socket.off('reservationexpired', ()=>{
      
    });
    socket.off('reservationsuccess', ()=>{
      
    });
    socket.off('disconnect', ()=>{
      
    });

  };
  }, []); 
  

    if(!admin){
      return (
        <div>
         Unauthorised!!
     </div>
    )
    }

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
 
  <div className="space-y-4 p-5" > {/* Container with vertical space between items */}
    {Reservations.map((r) => (
        
        <Reservation reservation={r} key={r._id}/>
    ))}
  </div>
</div>

  );
   
}