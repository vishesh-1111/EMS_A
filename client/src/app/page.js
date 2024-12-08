 "use client";
import './globals.css';
import { useEffect, useState } from 'react';  
import NavBar from '../components/NavBar';
import Dashboard from '../components/dashboard';
import RenderAllEvents from '../components/Events'; 

export default function HomePage(){
  const [user, setUser] = useState(null); 

  return (
    <div>
      <NavBar user={user} setUser={setUser} /> 
      <Dashboard user={user} setUser={setUser} /> 
      <RenderAllEvents user={user} /> 
    </div>
  );
}


