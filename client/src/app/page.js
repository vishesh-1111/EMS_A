"use client";
import './globals.css';
import {  useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import RenderAllEvents from '../components/Events'; 
import { Layout } from 'antd';
import HeaderContent from './Header/HeaderContainer';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export default function HomePage() {
  console.log('rendered ',serverUrl);
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
    const user = await response.json();
    console.log(user);
    return user;
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
      <></>
    )
  }
  return (
  
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
          <RenderAllEvents  user={user}></RenderAllEvents>
        </Content>

    </Layout>
         
  );
}
