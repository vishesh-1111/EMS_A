"use client"
import { useStatStyles } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader/index.jsx'
import { useQueryClient } from '@tanstack/react-query';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function HandleLogout(){
  const [isLoggedOut,setIsLoggedOut]=useState(null);
  const router = useRouter();
  const queryclient = useQueryClient();
    useEffect(()=>{
     
         const CallServerForLogout = async() => {
            const response = await fetch(`${serverUrl}/user/logout`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
        
               setIsLoggedOut(true);
               queryclient.invalidateQueries({
                 queryKey: ['fetchuser'],
                 exact: true, 
                 refetchInactive: true, 
               });
              queryclient.invalidateQueries({
                queryKey: ['bookings'],

                refetchInactive: true, 
              });
              queryclient.invalidateQueries({
                queryKey: ['userpayments'],
                exact: true, 
                refetchInactive: true, 
              });
              
              
            router.push('/login/user'); 
         }

         if(!isLoggedOut)CallServerForLogout();
        },[]);
     
       
           return <PageLoader></PageLoader>
       
    

}