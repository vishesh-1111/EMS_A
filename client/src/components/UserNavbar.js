"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menuj";
import { cn } from "@/lib/utils";

export default function HomeNavbar({user}) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar user={user} className="top-2" />
    </div>
  );
}

function Navbar({user,className }) {
  const [active, setActive] = useState(null);
  
  return (
    <>
      <div
        className={cn(
          "fixed top-0 inset-x-0 max-w-2xl mx-auto z-50", // fixed positioning with top-0 and full width
          className
        )}
      >

        
        <Menu setActive={setActive}>

          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/profile">{user.name}</HoveredLink>
              <HoveredLink  href="http://localhost:5000/user/logout" >Logout
                 
              </HoveredLink>
            </div>
         
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
