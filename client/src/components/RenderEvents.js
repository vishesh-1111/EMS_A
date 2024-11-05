import React from 'react';

// Card component to render individual event
export function Card({ event }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
      <a href="#" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-700 transition-colors">
        View Details 
      </a>
    </div>
  );
}
export default function RenderEvents() {
  const events = [
    { title: 'Event-1', image: '/images/imagica.jpg' },
    { title: 'Event-2', image: 'https://via.placeholder.com/150' },
    { title: 'Event-3', image: 'https://via.placeholder.com/150' },
    { title: 'Event-4', image: 'https://via.placeholder.com/150' },
    { title: 'Event-5', image: 'https://via.placeholder.com/150' },
    { title: 'Event-6', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <Card key={index} event={event} />
      ))}
    </div>
  );
}
