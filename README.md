# LSU Merch Backend

### Team Name: MIERNEDO / Members: Robert Allred, Sydney Weakley, Michael Wilson, Eduardo Martin

## Overview:

This app is going to be the back end of an e-commerce website designed to sell clothing and merchandise related to Lousiana State University (LSU) athletics.

This is part of the Capstone project for Fullstack Academy's 26 week part time web dev course covering HTML, CSS, JavaScript, React JS, Node JS, Express, PostgreSQL and more

# API DOCS

## USERS ENDPOINTS

### POST /users/register

This route is used to create a new user account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

Body:
(object, required) contains the following key/value pairs:
-email (string, required): the desired email for the new user
-password (string, required): the desired password for the new user
-firstName (string, required): the first name of the new user
-lastName (string, required): the last name of the new user
-isAdmin (boolean, required): default false, is the new user an admin?

Returned Data
-token (string): the JSON Web Token which is used to authenticate the user with any future calls
-message (string): Thanks for signing up for our service.
-user (object): New user that was created

### POST /users/login

This route is used for a user to login when they already have an account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

Body:
(object, required) contains the following key/value pairs:
email (string, required): the registered email for the user
password (string, required): the matching password for the user

Returned Data
-token (string): the JSON Web Token which is used to authenticate the user with any future calls
-message (string): You are logged in!
-user (object): New user that logged in

### GET /users/profile

This route is used to grab an already logged in user's relevant data. It is mostly helpful for verifying the user has a valid token (and is thus logged in). You must pass a valid token with this request, or it will be rejected.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${token}

Returned Data
-user (object): User that matches token
-past orders
-users' cart (from users_products table)

### PATCH /users/:userId

This route is used to update the user's personal information

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${token}

Body:
(object, required) contains the following key/value pairs:
-email (string, optional): the desired email for the new user
-password (string, optional): the desired password for the new user
-firstName (string, optional): the first name of the new user
-lastName (string, optional): the last name of the new user
-isAdmin (boolean, optional): default false, is the new user an admin?

Returned Data
Updates User (object)

### PATCH /users/:userId/cart

This route is used to update the user's cart

## PRODUCTS ENDPOINTS

### GET /products

This route is used to grab all products currently listed as inventory items

Returned Data
-products(array of object)
+id (string)
+name (string)
+description (string)
+image (string)
+price (string)
+quantity (number)
+size (string)

+reviews

### POST /products

This route will be used to create individual products

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

Body:
-product(object, required)
+name
+description
+image
+price
+quantity
+size

### PATCH /products/:productId

This route will be used to edit individual products

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

Body:
-product(object, required)
+name
+description
+image
+price
+quantity
+size

### DELETE /products/:productId

This route will be used to delete individual products

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

## REVIEWS ENDPOINTS

### POST /reviews/:productId

This will be used to add a review to an individual product

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

Body:
-review (object, required)
+message (string, required): This will be the text associated with the review
+rating (number, required): This is the objects rating

### PATCH /reviews/:productId

This will be used to edit a review of an individual product

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

Body:
-review (object, required)
+message (string, optional): This will be the text associated with the review
+rating (number, optional): This is the objects rating

### DELETE /reviews/:productId

This will be used to delete a review of an individual product

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

## ORDERS ENDPOINTS

GET all orders

POST an individual order

PATCH an individual order
