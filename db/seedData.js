const {
  //Individiual table functions from all tables here
  createUser,
} = require('./');

const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables');
  await client.query(`
  DROP TABLE IF EXISTS users;`);
}

async function createTables() {
  console.log('Starting to build the tables...');
  await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false
  )`);
  //Will add addressId after adding address table
  //Phone Number?
}

async function createInitialUsers() {
  console.log('Creating Initial Users');

  try {
    const usersToCreate = [
      {
        username: 'SydneyCodes',
        password: 'jdsff',
        firstName: 'Sydney',
        lastName: 'Weakley',
        isAdmin: true,
      },
      {
        username: 'RobertAlsoCodes',
        password: 'jdsff',
        firstName: 'Robert',
        lastName: 'Allred',
        isAdmin: true,
      },
      {
        username: 'MichalAlsoAlsoCodes',
        password: 'jdsff',
        firstName: 'Michael',
        lastName: 'Wilson',
        isAdmin: true,
      },
      {
        username: 'EduardoAlsoAlsoAlsoCodes',
        password: 'jdsff',
        firstName: 'Eduardo',
        lastName: 'Martin',
        isAdmin: true,
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function rebuildDB() {
  await dropTables();
  await createTables();
  await createInitialUsers();
  // To rebuild and reseed the database, we will need to :
  // 1) Drop Tables
  // 2) Create Tables
  // 3) Create Data for individual tables
  // 4) Catch and Throw Error
}

module.exports = rebuildDB;
