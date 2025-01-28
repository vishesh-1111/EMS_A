"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

export default function MyComponent() {
  // const [cookies] = useCookies(["token"]);
  // const [loading, setLoading] = useState(true);
  // const queryClient=useQueryClient();
  // const user = queryClient.getQueryData(["fetchuser"]);

  // useEffect(() => {
  //   const token = cookies.token;

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       setDecoded(decodedToken);
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <p>Name: {user.name}</p>
  //     <p>Email: {user.email}</p>
  //   </div>
  // );
  return(<div>
    hello
  </div>)
}
