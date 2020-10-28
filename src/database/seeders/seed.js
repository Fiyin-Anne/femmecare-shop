const { Seeder } = require('mongo-seeding');

const config = {
    database: "mongodb+srv://fiyinanne:fiyin@ecommerce-api.a9cbg.mongodb.net/test",
    dropDatabase: true,
};

const seeder = new Seeder(config);

const path = require('path');
const collections = seeder.readCollectionsFromPath(path.resolve("./src/database/seeders"));

try {
     seeder.import(collections);
     console.log("Successful!")
  } catch (err) {
    console.log(error)
  }
  // Do whatever you want after successful import
