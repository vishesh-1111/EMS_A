"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {useRouter} from 'next/navigation';


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const SignInSide = () => {
  const queryClient=  useQueryClient();
  const [creating,setIscreating] = useState(false);
  const user =useQueryClient().getQueryData(['fetchuser']);
  const router = useRouter();
  useEffect(()=>{
    if(!user||user.role!=='admin'){
      alert('Only Admins are allowed to create,modify and delete events');
      router.push('/');
    }
  })
  const handleSubmit = async(event) => {
    event.preventDefault();
    setIscreating(true);
    const data = new FormData(event.currentTarget);
  const userres=  {
      name: data.get("Name"),
      description: data.get("Description"),
      category: data.get("Category"),
      location: data.get("Location"),
    }

    try {
      const response = await fetch(`${serverUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userres),
        credentials : 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      alert("Event Created Successfully");
      queryClient.invalidateQueries({queryKey:["Events"]});
      router.push('/');
      const result = await response.json();

      console.log("Event created successfully:", result);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  

  
  };
  return (
    <Grid2  container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid2
        
        
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid2   sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Event Creation
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Event name"
              name="Name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Description"
              label="Event Description"
              type="Description"
              id="Description"
              autoComplete="current-Description"
            />
                <TextField
              margin="normal"
              required
              fullWidth
              name="Category"
              label="Event Category"
              type="Category"
              id="Category"
              autoComplete="current-Category"
            />
                <TextField
              margin="normal"
              required
              fullWidth
              name="Location"
              label="Event Location"
              type="Location"
              id="Location"
              autoComplete="current-Location"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={creating}
              sx={{ mt: 3, mb: 2 }}
            >
              Create Event
            </Button>
          
            <Box mt={5}>
      
            </Box>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default SignInSide;
