"use client";
import "./seatmap.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import CheckoutPage from "../../components/checkoutpage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQueryClient } from "@tanstack/react-query";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function App({ data, id }) {
  const seats = data.allseats
  const userSeatArr=data.seatarr;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hasBooked,setHasBooked] = useState(false);

    const router = useRouter(); 



  const totalseats = seats.length;

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.seatno === seatId);
    return seat ? sum + seat.price : sum;
  }, 0);
  const totalcents = Math.round(100*totalPrice)
  console.log(totalcents);

  // Function to handle booking (send request to the backend)
  const handleBooking = async () => {
    setHasBooked(true);
    try {
      const response = await fetch(`${serverUrl}/reservations`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventid: id,
          amount: totalPrice,
          seats: selectedSeats,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      
      const userR = await response.json(); 


      // After successful reservation, navigate to the /payment page
     } catch (error) {
      console.error('Error posting reservation:', error);
    }
  };
   
  if(hasBooked){
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${totalPrice}</span>
          </h2>
        </div>
  
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: Math.round(100*totalPrice),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={Math.round(100*totalPrice)} />
        </Elements>
      </main>
    );
  }

  return (
    <div className="App">
      <ShowCase />
      <Cinema
        seats={seats}
        selectedSeats={selectedSeats}
        userSeatArr={userSeatArr}
        onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)}
      />
      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span> seats for the price of{" "}
        <span className="total">${totalPrice}</span>
      </p>

      {selectedSeats.length > 0 && (
        <div className="pay-button-container flex justify-center mt-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            onClick={handleBooking} // Trigger the booking request
          >
            Pay ${totalPrice}
          </button>
        </div>
      )}
    </div>
  );
}


function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>standard</small>
      </li>
      <li>
        <span className="seat vip" /> <small>Premium</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
      <li>
        <span className="seat userseat" /> <small>Your seats</small>
      </li>
    </ul>
  );
}

function Cinema({ seats, selectedSeats, onSelectedSeatsChange,userSeatArr }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat.seatno);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat.seatno)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat.seatno]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatno);
          const isOccupied = seat.status === "reserved"|| seat.status==="booked"
          const isVip = seat.type === "vip";
          const isUserSeat=userSeatArr.includes(seat.seatno);

          return (
            <span
              tabIndex="0"
              key={seat._id}
              className={clsx(
                "seat",
                isVip && "vip",
                isSelected && "selected",
                isOccupied && "occupied",
                isUserSeat && "userseat"
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyDown={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === "Enter") {
                        handleSelectedState(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
