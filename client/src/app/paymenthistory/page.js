"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const fetchPaymentHistory = async () => {
  console.log('fetching payments..');
  const response = await fetch(`${serverUrl}/payment/history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your-access-token', // Replace with actual token
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json(); // Assuming the API returns an array of payment history
};

export default function RenderPaymentHistory() {
  const { data: paymentHistory, isLoading, error } = useQuery(
    ['userpayments'], // Query key
    fetchPaymentHistory, // Fetching function
    {
      staleTime: Infinity,  
      refetchOnMount : true,
    }
  );

  if (isLoading) {
    return <p>Loading payment history...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Payment History</h2>
      {paymentHistory && paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {payment._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${payment.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No payment history available.</p>
      )}
    </div>
  );
}
