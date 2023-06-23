const {
  //Individiual table functions from all tables here
} = require('./');

const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables');
  await client.query(`
  DROP TABLE IF EXISTS "users";`);
}

async function createTables() {
  console.log('Starting to build the tables...');
  await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY
  )`);
}

async function rebuildDB() {
  dropTables();
  createTables();
  // To rebuild and reseed the database, we will need to :
  // 1) Drop Tables
  // 2) Create Tables
  // 3) Create Data for individual tables
  // 4) Catch and Throw Error
}

module.exports = rebuildDB;
