import { useEffect, useState } from "react";

export default function RenderReservation({ reservation }) {
    console.log('active',reservation.isActive);
    const expiredDate = new Date(reservation.expiresAt).getTime();
    const currentDate =  Date.now();
    const differenceInMilliseconds = expiredDate - currentDate;
    const remainingSeconds =(reservation.isActive?Math.max(0, differenceInMilliseconds / 1000):0);
  const [timeLeft, setTimeLeft] = useState(Math.round(remainingSeconds));

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", border: "1px solid #ccc" }}>
      <span>User ID: {reservation.userid}</span>
      <span>Status: {reservation.status}</span>
      <span>Reservation Date: {new Date(reservation.reservationDate).toLocaleString()}</span>
      <span>Time Left: {formatTimeLeft(timeLeft)}</span>
    </div>
  );
}
