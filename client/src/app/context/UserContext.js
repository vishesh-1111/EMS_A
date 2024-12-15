"use client"
import { createContext, useState } from "react";
export const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user,setUser] = useState(null);
    return (
        <UserContext.Provider value={{user}}>
            {props.children}
        </UserContext.Provider>
    )
}