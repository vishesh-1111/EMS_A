"use client"
import { useState,useEffect } from "react";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchUsers() {

  const response = await fetch(`${serverUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();
  if(response.ok){
    return result;
  }
  else{
    return -1;
  }
};

export default function RenderUsers(){
    const [users, setUsers] = useState(null); 

  useEffect(() => {
     if(!users){
         const GetUsers = async () => {
             const Users = await fetchUsers();
             setUsers(Users);
            };
            GetUsers();
        }
  }, [users]);  

   if(users===null){
    return(
        <div className="">
            Loading Users....
        </div>
    )
   }  
   if(users===-1){
    return (
      <div>
        Unauthorised
      </div>
    )
   }
        

    return(
        <div className="">
          {users.map((user)=>{
            return (
                <div key={user._id}>
                {user.name} 
              </div>
            )
          })} 
        </div>
    )
}