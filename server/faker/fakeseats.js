const mongoose = require('mongoose');
const seat = require('../models/seat'); 
const event =require('../models/event')
require('dotenv').config();


async function f(){
  try {
    // Connect to your MongoDB
    const dburl = 'mongodb+srv://visheshgautamofficial:jOtbQen04ffxWHwM@cluster1.2fogh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
    console.log(dburl)
    await mongoose.connect(dburl);

    console.log('Connected to MongoDB');

    // Fetch all events
    const events = await event.find();

    for (const event of events) {
      const { _id: eventId, standardseats, vipseats } = event;

      // Total number of seats
      const totalSeats = standardseats + vipseats;

      const seatsToInsert = [];

      // Insert VIP seats
      for (let i = 1; i <= vipseats; i++) {
        seatsToInsert.push({
          eventId,
          seatno: i,
          type: 'vip',
          price:event.ticketprice.vip,
        });
      }

      // Insert Standard seats
      for (let i = vipseats + 1; i <= totalSeats; i++) {
        seatsToInsert.push({
          eventId,
          seatno: i,
          type: 'standard',
          price:event.ticketprice.standard,
        });
      }

      // Insert into Seat collection
      await seat.insertMany(seatsToInsert);


      console.log(`Inserted ${seatsToInsert.length} seats for event ID: ${eventId}`);
    }

    console.log('All seats processed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error processing events:', error);
    mongoose.connection.close();
  }
}

f();