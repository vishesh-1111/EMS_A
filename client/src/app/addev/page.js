'use client'
import React, { useState } from 'react';
const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        category: '',
        location: '',
        totalseats: '',
        reservedSeats: 0,
        description: '',
        ticketprice: {
            vip: '',
            standard: '',
        },
        createdby: '', // Assume this is set via some authentication context or prop
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('ticketprice.')) {
            setFormData((prev) => ({
                ...prev,
                ticketprice: {
                    ...prev.ticketprice,
                    [name.split('.')[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Event created:', result);
            // Optionally reset form data or redirect
            setFormData({
                name: '',
                startTime: '',
                endTime: '',
                category: '',
                location: '',
                totalseats: '',
                reservedSeats: 0,
                description: '',
                ticketprice: {
                    vip: '',
                    standard: '',
                },
                createdby: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        backgroundColor: 'black',
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2>Create Event</h2>
            <input
                type="text"
                name="name"
                placeholder="Event Name"
                style={inputStyle}
                value={formData.name}
                onChange={handleChange}
                required
            />
    
            <input
                type="datetime-local"
                name="startTime"
                placeholder="ss"
                style={inputStyle}
                value={formData.startTime}
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                name="endTime"
                style={inputStyle}
                value={formData.endTime}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                style={inputStyle}
                value={formData.category}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                style={inputStyle}
                value={formData.location}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="totalseats"
                placeholder="Total Seats"
                style={inputStyle}
                value={formData.totalseats}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="reservedSeats"
                placeholder="Reserved Seats"
                style={inputStyle}
                value={formData.reservedSeats}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                style={inputStyle}
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="ticketprice.vip"
                placeholder="VIP Ticket Price"
                style={inputStyle}
                value={formData.ticketprice.vip}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="ticketprice.standard"
                placeholder="Standard Ticket Price"
                style={inputStyle}
                value={formData.ticketprice.standard}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="createdby"
                placeholder="Created By (Admin ID)"
                style={inputStyle}
                value={formData.createdby}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
                Submit
            </button>
        </form>
    );
};

export default EventForm;
