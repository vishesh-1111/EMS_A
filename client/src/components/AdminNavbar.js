"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menuj";
import { cn } from "@/lib/utils";

export default function HomeNavbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  
  return (
    <>
      <div
        className={cn(
          "fixed top-0 inset-x-0 max-w-2xl mx-auto z-10 bg-white shadow-md", // fixed positioning with top-0 and full width
          className
        )}
      >

        
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Logout">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="http://localhost:5000/user/logout">User</HoveredLink>
              <HoveredLink href="http://localhost:5000/admin/logout">Admin</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/signup/user">User</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="View users">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/signup/user">User</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
