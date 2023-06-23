// Importing all functions from individual tables and re-exporting
// This allows all functions for the individual tables to be imported into seedData to be imported together frm './'

module.exports = {
  ...require('./users'), // adds key/values from users.js
  ...require('./products'), // adds key/values from products.js
};
