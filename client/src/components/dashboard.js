"use client";
import Link from "next/link";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export default function Dashboard({user}) {

    
    if (user===null) {
      return (
        <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <div>
          <h2>Welcome</h2>
          <h2>Please log in to access your booked events history</h2>
        </div>
        </div>
      );
    }
   
   if(user.role==='admin')return (
    <div className="mt-40">
         <Link href="/users">
            <span style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>
              Manage Users
            </span>
          </Link>
          <Link href="/status">
            <span style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
              <p> Live Reservation Status</p>
            </span>
          </Link>
    </div>
  
  )

  return (
    
    <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      
      <h2 >  Dashboard</h2>
      <h1> Welcome "{user.name}" </h1>
      <Link href="/history">
            <span style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>
              Go to Dashboard
            </span>
          </Link>
    </div>
  );
}
