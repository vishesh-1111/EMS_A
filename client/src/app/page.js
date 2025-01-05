"use client";
import './globals.css';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import NavBar from '../components/NavBar';
import RenderAllEvents from '../components/Events'; 
import { Layout } from 'antd';
import HeaderContent from './Header/HeaderContainer';
import Dashboard from '../components/history/page';
import RenderChatBot from '../components/ChatBot'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function HomePage() {
  console.log('rendered');
  const { Content } = Layout;
  const [isDashboardLoaded,setIsDashboardLoaded]=useState(null);
  const router = useRouter();

  const fetchUser = async () => {
    console.log('fetching....');
    const response = await fetch(`${serverUrl}/user/temp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
      console.log(response.ok);
    if (!response.ok) {
       router.push('/login/user');
       return null;
    }

    return response.json();
  };

  const { data: user, isLoading, isError, error } = useQuery({
    queryFn: fetchUser, 
    queryKey: ['fetchuser'],
    staleTime: 1000*60*10, 
    cacheTime: 1000*60*20 
  });

  // Redirect to login page on error

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if(!user){
    return (
      <div></div>
    )
  }
  return (
    <Layout>
      <NavBar user={user} setUser={() => {}}></NavBar>
      <Layout>
        <HeaderContent user={user} />
        <Content
          style={{
            margin: '40px auto 30px',
            overflow: 'initial',
            width: '100%',
            padding: '0 50px',
            maxWidth: 1400,
          }}
        >
          <Dashboard user={user} setIsDashboardLoaded={setIsDashboardLoaded}></Dashboard>
          <RenderAllEvents  user={user}></RenderAllEvents>
        </Content>
        <RenderChatBot>

        </RenderChatBot>
      </Layout>
    </Layout>
  );
}
