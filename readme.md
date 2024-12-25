Project Title

Event Ticket Booking System

Project Overview

This project aims to develop an online platform where users can browse and book tickets for various events. 
The system will have two major roles: Admin and User. Admins will manage events, including adding event details, pricing, and availability. 
Users can browse available events, select tickets, and make reservations. 
Reservations will hold tickets for 5 minutes to ensure the user completes the payment process within that time.

Core Functional Requirements

1. User Role:

	•	User Registration & Login:
	•	Users must register with basic details (Name, Email and Password).
	•	Login/Logout functionality for returning users.
	•	Event Browsing:
	•	Users can view a list of events with essential details (Name, Date, Location, Ticket Price).
	•	Ticket Booking:
	•	Users can select tickets based on the number of seats and categories (VIP/Standard, etc.).
	•	Once selected, the ticket(s) will be reserved for 5 minutes to prevent overbooking.
	•	A countdown timer shows the remaining time for reservation.
	•	Payment & Confirmation:
	•	Users must complete the payment within 5 minutes to confirm the booking.
	•	Upon payment, the booking is confirmed, and a ticket (PDF or on-screen confirmation) is generated.
	•	If the payment is not completed, the reservation is released after 5 minutes.
	•	Booking History:
	•	Users can view their past and current bookings.

2. Admin Role:

	•	Admin Login:
	•	Admins have a separate login interface.
	•	Event Management:
	•	Add, update, or delete events with fields such as:
	•	Event Name, Description, Date, Time, Venue, Total Seats, Category, Ticket Prices.
	•	View Reservations:
	•	Admins can view ticket bookings and reservation status.
	•	Manage Users:
	•	View and manage registered users.

Technical Requirements

Frontend:

	•	HTML, CSS, JavaScript for responsive design.
	•	Use of React for dynamic rendering (optional but recommended).

Backend:

	•	Node.js/Express or Django/Flask to handle server-side operations.
	•	MySQL/PostgreSQL for database management.

Payment Integration:

	•	Integrate a dummy payment gateway or third-party service (e.g., Razorpay or Stripe).

Session Management:

	•	5-minute reservation logic using:
	•	Session Cookies or Redis (for scalable in-memory storage).
	•	Countdown timer on the user side to reflect the time limit.

API Endpoints (Example):

	•	GET /events – Retrieve all events.
	•	POST /reserve-ticket – Reserve ticket(s) for 5 minutes.
	•	POST /confirm-payment – Confirm the booking upon payment.
	•	GET /admin/view-reservations – Admin view of reservations.

System Constraints and Validations:

	•	Concurrency Control: Prevent multiple users from reserving the same ticket simultaneously.
	•	Session Expiry: Reserved tickets must be released after 5 minutes if payment is not made.
	•	Validation: Ensure proper input validation (e.g., email format, number of tickets).

Deliverables:

	•	Working web application with both User and Admin functionalities.
	•	Database schema for events, users, and reservations.
	•	Source code with appropriate documentation.
	•	Demo video showing the booking process and reservation timeout.

Bonus Features (Optional):

	•	Event filtering by category or location.
	•	Ticket cancellation option (with refund logic).
	•	Email notifications for booking confirmations.

This structure will ensure your project is comprehensive and demonstrates both frontend and backend skills with session management and basic e-commerce concepts.