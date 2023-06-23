const {
  //Individiual table functions from all tables here
  createUser,
  createProduct,
} = require('./');

const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables');
  await client.query(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);
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
  );
  
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price MONEY NOT NULL,
    quantity INTEGER NOT NULL,
    size VARCHAR(255)
  );
  `);
  //USERS
  //Will add addressId after adding address table
  //Phone Number?
  //PRODUCTS
  //Research how to add image?
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

async function createInitialProducts() {
  console.log('Creating Initial Products');

  try {
    const productsToCreate = [
      {
        name: 'Basketball',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        price: 25,
        quantity: 4,
      },
      {
        name: 'T-Shirt',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        price: 30,
        quantity: 10,
        size: 'XL',
      },
    ];

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Product created:');
    console.log(products);
    console.log('Finished creating products!');
  } catch (err) {
    console.error(err);
  }
}

async function rebuildDB() {
  await dropTables();
  await createTables();
  await createInitialUsers();
  await createInitialProducts();
  // To rebuild and reseed the database, we will need to :
  // 1) Drop Tables
  // 2) Create Tables
  // 3) Create Data for individual tables
  // 4) Catch and Throw Error
}

module.exports = rebuildDB;
