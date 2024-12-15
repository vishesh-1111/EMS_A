'use client';

import { useCookies } from 'next-client-cookies';
import { jwtDecode } from "jwt-decode";

export default function MyComponent() {
  const cookies = useCookies();
  const token = cookies.get('token'); // Get the JWT token from cookies


  if (!token) {
    return <div>No token found!</div>;
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return(
      <div>
        <p>
        Name : {decoded.name}
        </p>
        <p>
        email : {decoded.email}
        </p>
      </div>
    )
  } catch (error) {
    console.error('Failed to verify or decrypt the token:', error);
    return <div>Error decrypting token</div>;
  }
}
