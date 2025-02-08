Event Management Platform
Overview
This project is a full-stack event management platform built as part of an assignment. The platform allows users to create, manage, and view events. It includes user authentication, event creation and management tools, and real-time updates for attendees. The platform is deployed using free-tier hosting services.

Features
Frontend
User Authentication: Users can register and log in. There is also an option for "Guest Login" to access limited features.

Event Dashboard: Displays a list of upcoming and past events with filters for categories and dates.

Event Creation: A form to create an event with fields like event name, description, date/time, and more.

Real-Time Attendee List: Shows the number of attendees for each event in real-time.

Responsive Design: Ensures the platform works seamlessly on all devices.

Backend
Authentication API: Uses JWT for secure authentication.

Event Management API: CRUD operations for events with ownership restrictions.

Real-Time Updates: Uses WebSockets for real-time updates.

Database: Stores event and user data efficiently.

Technologies Used
Frontend: Next.js

Backend: Node.js with Express.js

Database: MongoDB

Real-Time Communication: Socket.IO

Hosting:

Frontend: Vercel

Backend: Render or Railway

Database: MongoDB Atlas

Image Hosting: Cloudinary Free Tier

Installation
Prerequisites
Node.js and npm installed on your machine.

MongoDB Atlas account for database hosting.

Cloudinary account for image hosting.




License
This project is licensed under the MIT License - see the LICENSE file for details.