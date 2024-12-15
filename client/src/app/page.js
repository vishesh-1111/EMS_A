 "use client";
import './globals.css';
import { useEffect, useState } from 'react';  
import NavBar from '../components/NavBar';
import Dashboard from '../components/dashboard';
import RenderAllEvents from '../components/Events'; 


export default function HomePage(){
  console.log('rendered');
  const [user, setUser] = useState(null); 
     
  useEffect(() => {
    const fetchData = async () => {
          const response = await fetch("http://localhost:5000/user/temp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        if(response.ok){
          setUser(result);
        }
    };
   if(user===null)fetchData(); 
  }); 
  
 

  return (
    <div>
      <NavBar user={user} setUser={setUser} /> 
      <Dashboard user={user} setUser={setUser} /> 
      <RenderAllEvents user={user} /> 
    </div>
  );
}
 

 



