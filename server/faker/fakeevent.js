const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker} = require('@faker-js/faker');
const {cloudinary} = require('../cloudinary')
dotenv.config();

  console.log(cloudinary.config());
const event = require('../models/event');  // Adjust this path to your Event model file
async function listImagesInFolder() {
    try {

      const result = await cloudinary.api.resources_by_asset_folder('EMS1');
      console.log(result.resources.length)
      return result.resources;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }
  
  listImagesInFolder().then((images) => {
    images.forEach((image) => {
        console.log(image);
    //   console.log(`Public ID: ${image.public_id}, URL: ${image.secure_url}`);
    });
  });
// MongoDB URI
const mongoURI = process.env.MONGO_URL;
console.log(mongoURI)
async function populateEvents() {
    await mongoose.connect(mongoURI);
    const images = await listImagesInFolder();
    allimages=images;
    
    const numberOfEvents =10; 
    const fakeEvents = [];

    for (let i = 0; i < numberOfEvents; i++) {
      const eventt = {
        name: faker.company.name(),
        category: faker.commerce.department(),
        location: faker.location.city(),
        tags: faker.helpers.arrayElements(['Technology', 'Music', 'Art', 'Business','Sport'], 2), 
        description: faker.lorem.paragraph(),
        date:faker.date.between({ from: '2025-02-05T00:00:00.000Z', to: '2025-02-12T00:00:00.000Z' }), 
        image:images[i],
      };
  

        fakeEvents.push(eventt);
    }

    try {
        await event.insertMany(fakeEvents);  
        console.log(`${numberOfEvents} fake events inserted successfully!`);
    } catch (error) {
        console.error('Error inserting fake events:', error);
    } finally {
        mongoose.connection.close();  
    }
}

populateEvents();

module.exports={
    cloudinary,
}