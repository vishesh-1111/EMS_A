"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchEventData(id) {
  const response = await fetch(`${serverUrl}/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();
  return result;
}

export default function EventPage() {
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    startTime: '',
    endTime: '',
    category: '',
    location: '',
    totalseats: '',
    description: '',
    ticketprice: {
      vip: '',
      standard: ''
    },
    coverimageUri: '',
    createdby: '', // This will be the admin's ID, can be fetched or passed as a prop
  });
  
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('ticketprice')) {
      const ticketType = name.split('.')[1];
      setFormData({
        ...formData,
        ticketprice: {
          ...formData.ticketprice,
          [ticketType]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     await fetch(`${serverUrl}/events/${id}`, {
        method: 'PUT',  // Using PUT to replace the entire document
        headers: {
          'Content-Type': 'application/json',
        },
        credentials : "include",
        body: JSON.stringify(formData),  // Send updated data in the request body
      });

  };

  useEffect(() => {
    console.log('use-effect called');
    if(!event){

        const fetchEvent = async () => {
            const eventData = await fetchEventData(id);
            setEvent(eventData);
        }
        fetchEvent();
    };

    if (event) {
      setFormData({
        name: event.name || '',
        path: event.path || '',
        startTime: event.startTime ? new Date(event.startTime).toISOString().slice(0, 16) : '',
        endTime: event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : '',
        category: event.category || '',
        location: event.location || '',
        totalseats: event.totalseats || '',
        reservedSeats: event.reservedSeats || 0,
        description: event.description || '',
        ticketprice: {
          vip: event.ticketprice?.vip || '',
          standard: event.ticketprice?.standard || '',
        },
      });
    }
  }, [id,event]);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.header}>{event ? 'Edit Event' : 'Loading values'}</h2>

      <div style={styles.inputGroup}>
        <label htmlFor="name" style={styles.label}>Event Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="path" style={styles.label}>Event Path (Optional)</label>
        <input
          type="text"
          id="path"
          name="path"
          value={formData.path}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="startTime" style={styles.label}>Start Time</label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="endTime" style={styles.label}>End Time</label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="category" style={styles.label}>Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="location" style={styles.label}>Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="totalseats" style={styles.label}>Total Seats</label>
        <input
          type="number"
          id="totalseats"
          name="totalseats"
          value={formData.totalseats}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="ticketprice.vip" style={styles.label}>VIP Ticket Price</label>
        <input
          type="number"
          id="ticketprice.vip"
          name="ticketprice.vip"
          value={formData.ticketprice.vip}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="ticketprice.standard" style={styles.label}>Standard Ticket Price</label>
        <input
          type="number"
          id="ticketprice.standard"
          name="ticketprice.standard"
          value={formData.ticketprice.standard}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.submitButton}>Submit</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    minHeight: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  }
};
