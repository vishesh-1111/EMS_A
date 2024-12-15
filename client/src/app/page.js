 "use client";
import './globals.css';
import { useEffect, useState } from 'react';  
import NavBar from '../components/NavBar';
import Dashboard from '../components/dashboard';
import RenderAllEvents from '../components/Events'; 

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function HomePage(){
  console.log('rendered');
  const [user, setUser] = useState(null); 
     console.log(serverUrl);
  // useEffect(() => {
  //   const fetchData = async () => {
  //         const response = await fetch(`${serverUrl}/user/temp`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       });

  //       const result = await response.json();
  //       if(response.ok){
  //         setUser(result);
  //       }
  //   };
  //  if(user===null)fetchData(); 
  // },[]); 
  
 

  return (
    <div>
      <NavBar user={user} setUser={setUser} /> 
      <Dashboard user={user} setUser={setUser} /> 
      <RenderAllEvents user={user} /> 
    </div>
  );
}
 

 



