"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GoogleButton from 'react-google-button'
import {
  IconBrandGoogle,
} from "@tabler/icons-react";

export default function UserLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const queryClient = useQueryClient(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    const formData = { email, password };
    const response = await fetch(`${serverUrl}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setErrorMessage(data.message || "Login failed. Please try again.");
      return;
    }
   
 queryClient.setQueryData(['fetchuser'],data.payload);

    console.log("redirecting");
    router.push("/");
  };

  const GuestLoginHandler = () => {
    queryClient.setQueryData(['fetchuser'],{
      name : 'guest',
      email : 'guest@gmail.com',
      role :'guest',
    });
    router.push("/");
  };

  const AdminLoginHandler = () => {
    router.push("/login/admin");
  };
  return (

    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-4  shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">User Login</h2>
      <form className="my-8 " onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </LabelInputContainer>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
          type="submit"
          disabled={isLoading}
          >
          {isLoading ? "Loading..." : "Login "}
          {/* <BottomGradient /> */}
        </button>
        
    
        <div className="flex justify-center items-start  pt-1">
</div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}

          onClick={GuestLoginHandler}
          >
          {isLoading ? "Loading..." : "Login as guest"}
          <BottomGradient />
        </button>

        <button
          className={`mt-10 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}

          onClick={AdminLoginHandler}
          >
          Admin Login
          <BottomGradient />
        </button>
  
    </div>
    

  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
