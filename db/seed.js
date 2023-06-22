//Code run to seed the database and then end the Client connection

const client = require('./client');
const rebuildDB = require('./seedData');

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
