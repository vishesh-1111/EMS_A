const mongoose = require('mongoose');
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const {event} = require('../models/event');  // Adjust this path to your Event model file

// MongoDB URI
const mongoURI = process.env.MONGOURL;

// Admin ID to be used for all events
const adminId = new mongoose.Types.ObjectId('672eefc7d64c770902c1c18c');

async function populateEvents() {
    await mongoose.connect(mongoURI);

    const numberOfEvents = 10;  // Number of events to generate
    const fakeEvents = [];

    for (let i = 0; i < numberOfEvents; i++) {
        const event = {
            name: faker.company.name(),
            path: faker.internet.url(),
            startTime: faker.date.future(),
            endTime: faker.date.future(),
            category: faker.commerce.department(),
            location: faker.location.city(),
            totalseats: faker.number.int({ min: 100, max: 500 }).toString(),
            reservedSeats: 0,
            description: faker.lorem.paragraph(),
            ticketprice: {
                vip: parseFloat(faker.commerce.price(50, 150, 0)),
                standard: parseFloat(faker.commerce.price(10, 50, 0)),
            },
            coverimageUri: faker.image.url(),
            createdby: adminId  // Assigning the admin ID to the createdby field
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
