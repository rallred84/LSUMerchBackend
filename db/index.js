// Importing all functions from individual tables and re-exporting
// This allows all functions for the individual tables to be imported into seedData to be imported together frm './'

module.exports = {
  ...require("./users"), // adds key/values from users.js
  ...require("./products"), // adds key/values from products.js
  ...require("./categories"), // adds key/values from categories.js
  ...require("./orders"), // adds key/values from orders.js
  ...require("./addresses"), // adds key/values from addresses.js
  ...require("./reviews"), // adds key/values from reviews.js
};
