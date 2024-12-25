"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


import { useState, useEffect } from "react";

async function fetchEventData(id) {
  const response = await fetch(`${serverUrl}/events/${id}`, {
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
    return null;
  }
}


  function RenderDashboard({ history }) {
    const [currentuserhistory,setCurrentuserhistory] = useState([]);
    const [pastuserhistory,setPastuserhistory] = useState([]);

  
  
    useEffect(() => {
      console.log('useEffect');
      const fetchEventDetails = history.map(async (bookedticket) => {
        const event = await fetchEventData(bookedticket.eventid);
        if (event) {
          console.log(event);
            return {
              _id: event._id,
              name: event.name,
              category: event.category,
              location: event.location,
              bookingDate: bookedticket.bookingDate,
              startTime: event.startTime,
              standardTickets: bookedticket.standardTickets,
              vipTickets: bookedticket.vipTickets,
            };
          }
        });
        
        
      
      Promise.all(fetchEventDetails).then((result) => {
        const currenthistory = result.filter(item => (item !== undefined&&(!item.isDeleted)));
        setCurrentuserhistory(currenthistory);
        const pasthistory = result.filter(item => (item !== undefined&&(item.isDeleted)));
        setPastuserhistory(pasthistory);

      });
    
    }, [history]);

    if(currentuserhistory.length===0){
      return(
        <div>
          <h1>
            NO BOOKINGS FOUND
          </h1>
        </div>
      )
    }
             
    return (
      <>
        {currentuserhistory.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Event Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Booking Date</StyledTableCell>
                  <StyledTableCell align="right">Start Time</StyledTableCell>
                  <StyledTableCell align="right">Standard Tickets</StyledTableCell>
                  <StyledTableCell align="right">VIP Tickets</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentuserhistory.map((ticket) => {
                  
                    return (
                    <StyledTableRow key={ticket._id}>
                      <StyledTableCell component="th" scope="row">
                        {ticket.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{ticket.category}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.location}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.bookingDate}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.startTime}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.standardTickets}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.vipTickets}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
              </Table>
          </TableContainer>
        )}


{pastuserhistory.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Event Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Booking Date</StyledTableCell>
                  <StyledTableCell align="right">Start Time</StyledTableCell>
                  <StyledTableCell align="right">Standard Tickets</StyledTableCell>
                  <StyledTableCell align="right">VIP Tickets</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastuserhistory.map((ticket) => {
                  
                    return (
                    <StyledTableRow key={ticket._id}>
                      <StyledTableCell component="th" scope="row">
                        {ticket.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{ticket.category}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.location}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.bookingDate}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.startTime}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.standardTickets}</StyledTableCell>
                      <StyledTableCell align="right">{ticket.vipTickets}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
              </Table>
          </TableContainer>
        )}
      </>
    );
  }



export default function Dashboard({user}) {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
   
    const fetchBookings = async () => {
    
      const response = await fetch(`${serverUrl}/bookings`, {
        method: "GET",
        credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const result = await response.json()
          setHistory(result);
        } 
        setLoading(false);
      };
      
      fetchBookings();
    }, []);
    
 
    
    if (loading) {
      return <div className="mt-40 w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        Loading.....
        </div>;
    }
    if(user.role==='admin'){
      return;
    }
 
  return (
        <div className=""> 
       <div className="relative w-max mx-">
  <span className="text-xl font-semibold text-blue-500">Dashboard</span>
  <div className="absolute left-0 top-full w-full h-0.5 bg-grey-500 mt-0"></div>
</div>
      <RenderDashboard history={history}></RenderDashboard>
    </div>
  );
}
