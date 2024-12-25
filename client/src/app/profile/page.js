"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";

export default function MyComponent() {
  const [cookies] = useCookies(["token"]);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = cookies.token;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [cookies]);

  if (!decoded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Name: {decoded.name}</p>
      <p>Email: {decoded.email}</p>
    </div>
  );
}
