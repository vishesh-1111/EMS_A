"use client";
import './globals.css';
import { use, useEffect, useState } from 'react';  
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import NavBar from '../components/NavBar';
import RenderAllEvents from '../components/Events'; 
import { Layout } from 'antd';
import  HeaderContent  from './Header/HeaderContainer'
import Dashboard from '../app/history/page'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function HomePage() {
  console.log('rendered');
  const { Content } = Layout;
  const [user, setUser] = useState(null); 
  const router = useRouter(); // Initialize the useRouter hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${serverUrl}/user/temp`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      
      if (response.ok) {
        setUser(result); // Set the user state if the response is ok
      } else {
        // If the response is not ok, set the user to 'guest' and navigate to login
        router.push('/login/user'); // Redirect to the login page
      }
    };

    if (user === null) {
      fetchData(); // Fetch data if user is null
    }
  }, []); 
  
  if (user === null || user === 'guest') {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <Layout>
      <NavBar user={user} setUser={setUser}></NavBar>

      <Layout>
     <HeaderContent user={user}/>
     <Content style={{
                margin: '40px auto 30px',
                overflow: 'initial',
                width: '100%',
                padding: '0 50px',
                maxWidth: 1400,
              }}>

        <Dashboard user={user}></Dashboard>
        <RenderAllEvents user={user}></RenderAllEvents>
     </Content>
    </Layout>
      </Layout>
  );
 
  
}
