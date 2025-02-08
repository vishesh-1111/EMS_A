"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {useRouter} from 'next/navigation'
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
  const router =  useRouter();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    tags : '',
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
    router.push('/');
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
        tags : event.tags||'',
        category: event.category || '',
        location: event.location || '',
        description: event.description || '',
  
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
