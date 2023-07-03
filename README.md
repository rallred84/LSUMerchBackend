# LSU Merch Backend

### Team Name: MIERNEDO / Members: Robert Allred, Sydney Weakley, Michael Wilson, Eduardo Martin

## Overview:

This app is going to be the back end of an e-commerce website designed to sell clothing and merchandise related to Louisiana State University (LSU) athletics.

This is part of the Capstone project for Fullstack Academy's 26 week part time web dev course covering HTML, CSS, JavaScript, React JS, Node JS, Express, PostgreSQL and more

# <a name ="api-docs"></a>API DOCS

[USERS](#users-endpoints)  
[PRODUCTS](#products-endpoints)  
[REVIEWS](#reviews-endpoints)  
[ORDERS](#orders-endpoints)

## <a name ="users-endpoints"></a>USERS ENDPOINTS

### POST /users/register

**END USER ROUTE**

This route is used to create a new user account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

**Body:**  
**(object, required) contains the following key/value pairs:**  
·email (string, required): the desired email for the new user  
·password (string, required): the desired password for the new user  
·firstName (string, required): the first name of the new user  
·lastName (string, required): the last name of the new user  
·isAdmin (boolean, required): default false, is the new user an admin?

**Returned Data**  
·token (string): the JSON Web Token which is used to authenticate the user with any future calls  
·message (string): Your account has been created ${firstName}!  
·user (object): New user that was created

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your account has been created Clark!",
    "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
    "user": {
      "id": 5,
      "email": "superman27@gmail.com"
      //Additional user information
    }
  }
}
```

### POST /users/login

**END USER ROUTE**  
This route is used for a user to login when they already have an account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

**Body:**  
**(object, required) contains the following key/value pairs:**  
·email (string, required): the registered email for the user  
·password (string, required): the matching password for the user

**Returned Data**  
·token (string): the JSON Web Token which is used to authenticate the user with any future calls  
·message (string): You are now logged in ${firstName}!  
·user (object): Logged In user

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "You are now logged in Clark! ",
    "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
    "user": {
      "id": 5,
      "email": "superman27@gmail.com"
      //Additional user information
    }
  }
}
```

### GET /users/profile

**END USER ROUTE**

This route is used to grab an already logged in user's relevant data. It is mostly helpful for verifying the user has a valid token (and is thus logged in). You must pass a valid token with this request, or it will be rejected.

**Headers:**  
**(object literal, required)**  
·Content-Type (string, required): application/json  
·Authorization (template literal, required): Bearer ${token}

**Returned Data**  
·user (object): Logged In User  
Includes additional keys "reviews" and "cart":  
·reviews (array): Reviews that the user has given to different products in the store  
·cart (array): User's current cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 5,
      "email": "superman27@gmail.com",
      //Additional user information
      "orders": [
        { "id": 3, "price": 10, "hasShipped": true, "isComplete": false }
      ],
      "reviews": [
        {
          "productId": 6,
          "message": "This product was wonderful!!",
          "rating": 9,
          "date": "2023-06-26"
        }
      ],
      "cart": [
        {
          "productId": 4,
          "productDescription": "LSU Basketball T-Shirt",
          "productPrice": 12,
          "quantity": 4
        }
      ]
    }
  }
}
```

### PATCH /users/profile

**END USER ROUTE**

This route is used to update the user's personal information

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal, required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**
·email (string, optional): the desired email for the updated user  
·password (string, optional): the desired password for the updated user  
·firstName (string, optional): the first name of the updated user  
·lastName (string, optional): the last name of the updated user  
·isAdmin (boolean, optional): is the updated user an admin?

**Returned Data**  
·message (string): Your account has been updated ${firstName}!  
·updated user (object)

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your account has been updated Clark!",
    "user": {
      "id": 5,
      "email": "superman27@gmail.com"
      //Additional user information
    }
  }
}
```

<!-- ### POST /users/cart

**END USER ROUTE**

This route is used to add an item to a user's cart

**Headers:**
**(object literal, required)**
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${token}

**Body:**
**(object, required) contains the following key/value pairs:**
·userId (number, required): The user's ID
·productId (number, required): The product id of the item being added to the cart
·quantity (number, required): The quantity of given products added to cart

**Returned Data**
·message (string): Item has been added to cart
·product (object): The item that was added to the cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Item has been added to cart",
    "product": {
      "productId": 4,
      "productDescription": "LSU Basketball T-Shirt",
      "productPrice": 12,
      "quantity": 4
    }
  }
}
```

### PATCH /users/cart

END USER ROUTE

This route is used to change the quantity of an item in a user's cart

**Headers:**
**(object literal, required)**
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${token}

**Body:**
**(object, required) contains the following key/value pairs:**
·userId (number, required): The user's ID
·productId (number, required): The product id of the item being added to the cart
·quantity (number, required): The updated quantity of given products added to cart

**Returned Data**
·message (string): Quantity has been updated on item in your cart
·product (object): The item in the cart that was edited

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Quantity has been updated on item in your cart",
    "product": {
      "productId": 4,
      "productDescription": "LSU Basketball T-Shirt",
      "productPrice": 12,
      "quantity": 4
    }
  }
}
```

### DELETE /users/cart

**END USER ROUTE**

This route is used to remove an item from a user's cart

**Headers:**
**(object literal, required)**
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${token}

**Body:**
**(object, required) contains the following key/value pairs:**
·userId (number, required): The user id for the user the cart belongs to
·productId (number, required): The product id of the item being added to the cart

**Returned Data**
·message (string): Item has been removed from your cart
·product (object): The item in the cart that was removed

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Item has been removed from your cart",
    "product": {
      "productId": 4,
      "productDescription": "LSU Basketball T-Shirt",
      "productPrice": 12,
      "quantity": 4
    }
  }
}
``` -->

## <a name="products-endpoints"></a>PRODUCTS ENDPOINTS

[Go back to top of page](#api-docs)

### GET /products

**END USER ROUTE**

This route is used to grab all products currently listed as inventory items

**No Headers or Body required**

**Returned Data**  
·products (array): All products currenlty listed as inventory items

**Sample Result**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 2,
        "name": "Mug",
        "description": "Lorem ipsum dolor",
        //image information
        "price": 10,
        "quantity": 3,
        "size": null
      },
      {
        "id": 4,
        "name": "T-shirt",
        "description": "Lorem ipsum dolor",
        //image information
        "price": 8,
        "quantity": 2,
        "size": null
      }
      //more products
    ]
  }
}
```

### POST /products

**ADMIN ROUTE**

This route will be used to create individual products

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·name (string, required): The name of the product being added  
·description (string, required): Description of the product being added  
·image (**NEED TO FIGURE THIS OUT**)  
·price (number, required): Price of product being added  
·quantity (number, required): Amount of product in inventory  
·size (string, optional): Size of product being added, if applies

**Returned Data**  
·message (string): Product added to inventory
·product (object): New product that was created

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product added to inventory",
    "product": {
      "id": 4,
      "name": "World Series Mug",
      "description": "Mug celebrating the world series win",
      //Image Info
      "price": 10,
      "quantity": 12,
      "size": null
    }
  }
}
```

### PATCH /products/:productId

ADMIN ROUTE

This route will be used to edit individual products

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·name (string, optional): The name of the product being added  
·description (string, optional): Description of the product being added  
·image (**NEED TO FIGURE THIS OUT**)  
·price (number, optional): Price of product being added  
·quantity (number, optional): Amount of product in inventory  
·size (string, optional): Size of product being added, if applies

**Returned Data**  
·message (string): Product has been updated  
·product (object): Updated product

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product has been updated",
    "product": {
      "id": 4,
      "name": "World Series Mug",
      "description": "Mug celebrating the world series win",
      //Image Info
      "price": 11,
      "quantity": 10,
      "size": null
    }
  }
}
```

### DELETE /products/:productId

**ADMIN ROUTE**

This route will be used to delete individual products

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
·message (string): Product has been deleted from inventory
·product (object): Product that was deleted

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product has been deleted from inventory",
    "product": {
      "id": 4,
      "name": "World Series Mug",
      "description": "Mug celebrating the world series win",
      //Image Info
      "price": 11,
      "quantity": 10,
      "size": null
    }
  }
}
```

## <a name ="reviews-endpoints"></a>REVIEWS ENDPOINTS

[Go back to top of page](#api-docs)

### POST /reviews/:productId

**END USER ROUTE**

This will be used to add a review to an individual product

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token} (_Authorization will provide the creatorId_)

**Body:**  
**(object, required) contains the following key/value pairs:**  
·message (string, required): This will be the text associated with the review  
·rating (number, required): This is the objects rating

**Returned Data**  
·message (string): Your review has been submitted  
·review (object): Review that was added

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your review has been submitted",
    "review": {
      "id": 3,
      "creatorId": 2,
      "productId": 3,
      "message": "This product sucks!",
      "rating": 10,
      "date": "2023-06-26"
    }
  }
}
```

### PATCH /reviews/:productId

**END USER ROUTE**

This will be used to edit a review of an individual product

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·message (string, optional): This will be updated text associated with the review  
·rating (number, optional): This is the objects rating

**Returned Data**  
·message (string): Your review has been updated
·review (object): Review that was edited

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your review has been updated",
    "review": {
      "productId": 9,
      "message": "This product is wonderful!",
      "rating": 10,
      "date": "2023-06-27"
    }
  }
}
```

### DELETE /reviews/:productId

**END USER ROUTE**

This will be used to delete a review of an individual product

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
·message (string): Your review has been removed  
·review (object): Review that was removed

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your review has been removed",
    "review": {
      "id": 13,
      "creatorId": 3,
      "productId": 2,
      "message": "This is great!",
      "rating": 10,
      "date": "2023-07-03T05:00:00.000Z"
    }
  }
}
```

## <a name ="orders-endpoints"></a>ORDERS ENDPOINTS

[Go back to top of page](#api-docs)

### GET /orders

**ADMIN ROUTE**

This will be a route used to get a list of all orders

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
orders (array): array of all orders

**Sample Result**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1,
        "userId": 2,
        "price": 40,
        "orderStatus": "In Cart"
      },
      {
        "id": 2,
        "userId": 3,
        "price": 30,
        "orderStatus": "Order Complete"
      }
      //more orders
    ]
  }
}
```

### GET /orders/:userId

**ADMIN ROUTE**  
This will be a route used to get a list of all orders for one particular user

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
orders (array): array of all orders for a particular user

**Sample Result**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 22,
        "userId": 2,
        "price": null,
        "orderStatus": "Order Complete"
      },
      {
        "id": 24,
        "userId": 2,
        "price": null,
        "orderStatus": "In Cart"
      }
    ]
  }
}
```

### POST /orders

**END USER ROUTE**

This route will be used to create a new order. The default status of every new order created will be an order with a status of "In Cart" and no products.

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token} (_Authorization will provide the userId_)

**No Body Required**

**Returned Data**  
·message: New Persistant Cart Created  
·order (object) containing the following key/value pairs  
···id (number): Order ID number  
···userId (number): The user ID of the user the cart belongs to
···totalPrice (number, default null): A sum of the (price x quanity) for each item in the order  
···orderStatus (enumerated list, default "In Cart" ): The current status of the order  
···products (array, default empty): A list of all products included in order

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "New Persistant Cart Created",
    "order": {
      "id": 24,
      "userId": 2,
      "price": null,
      "orderStatus": "In Cart",
      "products": []
    }
  }
}
```

### PATCH /orders/:orderId

<!-- **ADMIN ROUTE**

This route will be used to edit order status when packed, delivered, or completed

**Headers:**
**(object literal, required)**
Content-Type (string, required): application/json
Authorization (template literal,required): Bearer ${token}

**Body:**
**(object, required) contains the following key/value pairs:**
hasShipped(boolean, optional): Has the order shipped?
isComplete(boolean, optional): Is the order completed?

**Returned Data**
**order (object) containing the following key/value pairs**
id (number): Order ID number
message (string): Order status has been updated
hasShipped (boolean, default false): Has the item shipped? This will be manually updated by admin
isComplete (boolean, default false): Has the order been completed? This will be manually updated by admin

**Sample Result**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": 1,
      "message": "Order status has been updated",
      "hasShipped": true,
      "isComplete": false
    }
  }
}
``` -->
