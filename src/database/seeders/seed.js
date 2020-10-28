const { Seeder } = require('mongo-seeding');
require('dotenv/config')

const config = {
    database: process.env.MONGO_DB,
    dropDatabase: true,
};

const seeder = new Seeder(config);

const path = require('path');
const collections = seeder.readCollectionsFromPath(path.resolve("./src/database/seeders"));

try {
     seeder.import(collections);
  } catch (err) {
    console.log(error)
  }

console.log("Successful!")
