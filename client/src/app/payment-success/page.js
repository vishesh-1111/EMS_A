"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const payment_intent_id = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const redirect_status = searchParams.get("redirect_status");

  useEffect(() => {
    if (amount && payment_intent_id && redirect_status === "succeeded") {
      const updateReservation = async () => {
        try {
          const response = await fetch("http://localhost:5000/reservations/update-reservation", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentStatus: redirect_status,
              amount,
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("Reservation updated successfully:", data);
          } else {
            console.error("Failed to update reservation:", data);
          }
        } catch (error) {
          console.error("Error making request:", error);
        }
      };

      updateReservation();
    }
  }, [amount, payment_intent_id, redirect_status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans relative overflow-hidden">
      {/* Sparkles */}
      <div className="absolute inset-0">
        <div className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-ping"></div>
        <div className="absolute w-3 h-3 rounded-full bg-pink-500 animate-bounce"></div>
        <div className="absolute w-4 h-4 rounded-full bg-white opacity-50 animate-pulse"></div>
      </div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-75 animate-[confetti_5s_linear_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">🎉 Payment Successful! 🎉</h1>
        <p className="text-lg mb-6">Thank you for your payment!</p>

        {/* Details */}
        <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md ">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <p className="mb-2">
            <span className="font-semibold">Amount:</span> ${amount}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Payment Intent ID:</span> {payment_intent_id}
          </p>

          <p>
            <span className="font-semibold">Redirect Status:</span> {redirect_status}
          </p>
        </div>

        <Link href={"/"}>
          <button
            className="mt-8 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:scale-110 transform transition duration-300"
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
  
      <PaymentSuccessContent />
  );
}
