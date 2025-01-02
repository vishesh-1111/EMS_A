"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../socket.js';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function BookEvent({ event, cost, vipTickets,
  standardTickets,remainingSeconds,userReservation }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const [seconds, setSeconds] = useState(remainingSeconds||120);
    const [isRunning, setIsRunning] = useState(true);
    const [reservation, setReservation] = useState(userReservation);
    const queryClient = useQueryClient();

 

  useEffect(() => {
    const HandleConnection = () => {
     console.log('socket connected ?',socket.connected);
    }

    socket.connect();
    socket.on('connect',HandleConnection);
      
    console.log(cost);
    const PostReservation = async () => {
      try {
        const response = await fetch(`${serverUrl}/reservations`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventid: event._id,
            vipTickets: vipTickets,
            standardTickets: standardTickets,
            cost : cost,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create reservation');
        }
        const userR = await response.json();
        setReservation(userR.reservation);
      }
     catch (error) {
      console.error('Error posting reservation:', error);
    }
  }
    
    if(!reservation){
      console.log('posting...');
      PostReservation();
    }
   
   return ()=>{
       socket.off('connect',HandleConnection);
       socket.disconnect();
    }
  }, []);


  

  // Payment script


  useEffect(() => {
    let interval;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsRunning(false);
      alert("Time's up!");
      router.push('/');
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = async (e) => {
    console.log('hss');
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch(`${serverUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          event,
          cost,
          cardNumber,
          expirationDate,
          vipTickets,
          standardTickets,
        }),
      });

      if (response.ok) {
          setMessage('Payment Successful!');
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
          alert('success');
          router.push('/'); 

      } else {
        setMessage(`Payment Failed: ${response.data.message}`);
      }
    } catch (error) {
      setMessage('Payment request failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div>
    <div>{reservation&&reservation._id}</div>
      <div>
        <h1>Timer: {formatTime(seconds)}</h1>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>
          Payment Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555',
              }}
            >
              Card Number:
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4111 1111 1111 1111"
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555',
              }}
            >
              Expiration Date (MM/YY):
            </label>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="12/25"
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555',
              }}
            >
              Amount:
            </label>
            <input
              type="number"
              readOnly
              placeholder={`${cost}`}
              required
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '16px',
              color: '#ff5722',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );

return(
  <div>
    HI
  </div>
)
}