Project Title

Event Ticket Booking System

Project Overview

This project aims to develop an online platform where users can browse and book tickets for various events. 
The system will have two major roles: Admin and User. Admins will manage events, including adding event details, and availability. 
Users can browse available events, select tickets, and make reservations. 
Guest Option is also provided.

LOCAL SETUP:
# 1️⃣ Clone the Repository
git clone https://github.com/vishesh-1111/EMS_A.git
cd EMS_A
# 2️⃣ Install Dependencies
For Server:
cd server
npm install

For Client:
cd ../client
npm install
# 3️⃣ Setup Environment Variables
server:
see env.sample
client
see env.sample

# 4️⃣ Generate Fake Data
go to server/faker.
run both admin and event codes

# 5️⃣ Run the Project
Server:

cd server
npm start
Client:

cd ../client
npm run dev
#6️⃣ Access the Application
Frontend: http://localhost:3000
Backend API: http://localhost:5000
