
import  CheckAuth from '../components/checkauth'
import HomeNavbar from '../components/HomeNavBar'
import AdminNavbar from '../components/AdminNavbar'
import UserNavbar from '../components/UserNavbar'
import { useEffect } from 'react'

export default function NavBar({user,setUser}){
    console.log('inside navbar'); 
    console.log(user);
   
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
        //console.log(result);
        if(response.ok)setUser(result);
    };
   if(user===null)fetchData(); 
  }); 

    return (
        <>    
             {user === null && <HomeNavbar />}
            {user?.role === 'user' && <UserNavbar />}
            {user?.role === 'admin' && <AdminNavbar />} 
        </>
    );
}











