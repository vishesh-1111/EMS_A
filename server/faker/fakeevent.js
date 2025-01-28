const mongoose = require('mongoose');
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const event = require('../models/event');  // Adjust this path to your Event model file

// MongoDB URI
const mongoURI = process.env.LOCAL_MONGO_URL;


async function populateEvents() {
    
    await mongoose.connect("mongodb+srv://visheshgautamofficial:jOtbQen04ffxWHwM@cluster1.2fogh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");

    const numberOfEvents = 10;  // Number of events to generate
    const fakeEvents = [];

    for (let i = 0; i < numberOfEvents; i++) {
      // Generate the number of VIP and standard seats
      const totalSeats = faker.number.int({ min: 4, max: 7 })*8;
      const vipseats = 8;
      const standardseats = totalSeats - vipseats;
  
      const event = {
        name: faker.company.name(),
        path: faker.internet.url(),
        startTime: faker.date.future(),
        endTime: faker.date.future(),
        duration: `${Math.floor(Math.random() * 4 + 1)} hours`, // Random duration between 1-4 hours
        category: faker.commerce.department(),
        location: faker.location.city(),
        standardseats: standardseats,
        vipseats: vipseats,
        tags: faker.helpers.arrayElements(['Technology', 'Music', 'Art', 'Business'], 2), // Random tags
        description: faker.lorem.paragraph(),
        ticketprice: {
          vip: parseFloat(faker.commerce.price(50, 150, 0)),
          standard: parseFloat(faker.commerce.price(10, 50, 0)),
        },
        coverimageUri: faker.image.url(),
        isDeleted: false, // Default value
      };
  

        fakeEvents.push(event);
    }

    try {
        await event.insertMany(fakeEvents);  // Insert the fake events into the collection
        console.log(`${numberOfEvents} fake events inserted successfully!`);
    } catch (error) {
        console.error('Error inserting fake events:', error);
    } finally {
        mongoose.connection.close();  // Close the MongoDB connection
    }
}

populateEvents();