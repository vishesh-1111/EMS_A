"use client"
import { useStatStyles } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader/index.jsx'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function HandleLogout(){
    const [isLoggedOut,setIsLoggedOut]=useState(null);
    const router = useRouter();
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
              
            router.push('/login/user'); 
         }

         CallServerForLogout();
        });
     
       
           return <PageLoader></PageLoader>
       
    

}