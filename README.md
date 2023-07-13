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
[ORDERS_PRODUCTS](#orders-products-endpoints)

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
·message (string): "Your account has been created ${firstName}!"  
·user (object): New user that was created

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your account has been created Robert!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImVtYWlsIjoicmVkODRAZ21haWwuY29tIiwiaWF0IjoxNjg4NzA4NTMwLCJleHAiOjE2ODkzMTMzMzB9.fILRTwGrvIPX06RvWVQUn6aTkIaUCLxG-RV7A23q5ps",
    "user": {
      "id": 58,
      "email": "red84@gmail.com",
      "firstName": "Robert",
      "lastName": "Allred",
      "isAdmin": false
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
·message (string): "You are now logged in ${firstName}!"  
·user (object): Logged In user

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "You are logged in Robert!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsImVtYWlsIjoicmVkODRAZ21haWwuY29tIiwiaWF0IjoxNjg4NzA4NzQ5LCJleHAiOjE2ODkzMTM1NDl9.u1k0QQS6lbJ4_nGzp8vScdvoOgInOrq2IOQsmu3AkSk",
    "user": {
      "id": 58,
      "email": "red84@gmail.com",
      "firstName": "Robert",
      "lastName": "Allred",
      "isAdmin": false
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

**No Body Required**

**Returned Data**  
·user (object): Logged In User  
_Includes following additional key/value pairs:_  
·orders (array): All Orders (including in cart, placed, and completed) belonging to the user  
·reviews (array): Reviews that the user has given to different products in the store  
·cart (object): User's current cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 58,
      "email": "red84@gmail.com",
      "firstName": "Robert",
      "lastName": "Allred",
      "isAdmin": false,
      "orders": [
        {
          "id": 102,
          "userId": 58,
          "totalPrice": 180,
          "orderStatus": "Order Placed",
          "products": [
            {
              "id": 8,
              "name": "Hat",
              "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
              "price": "$60.00",
              "size": null,
              "quantity": 3
            }
          ]
        },
        {
          "id": 103,
          "userId": 58,
          "totalPrice": 0,
          "orderStatus": "In Cart",
          "products": []
        }
      ],
      "reviews": [
        {
          "id": 78,
          "productId": 2,
          "productName": "Ball",
          "message": "This is great!",
          "rating": 10,
          "date": "2023-07-07T05:00:00.000Z"
        },
        {
          "id": 79,
          "productId": 4,
          "productName": "Shoes",
          "message": "This is awful!",
          "rating": 4,
          "date": "2023-07-07T05:00:00.000Z"
        }
      ],
      "cart": {
        "id": 103,
        "userId": 58,
        "totalPrice": 0,
        "orderStatus": "In Cart",
        "products": []
      }
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

**Returned Data**  
·message (string): "Your account has been updated ${firstName}!"  
·user (object): The updated user

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Your account has been updated Rob!",
    "user": {
      "id": 58,
      "email": "red84@gmail.com",
      "firstName": "Rob",
      "lastName": "Allred",
      "isAdmin": false
    }
  }
}
```

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
        "id": 1,
        "name": "Bacon",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "price": "$94.00",
        "stockQuantity": 112,
        "imageURL": "https://tigers-den.s3.us-east-2.amazonaws.com/lsu-mug2.png",
        "size": null,
        "reviews": [
          {
            "id": 15,
            "creatorId": 22,
            "productId": 1,
            "message": "Deleniti ea libero nihil quas nostrum ab molestias beatae perferendis omnis fuga natus inventore iusto aspernatur iure officia exercitationem quibusdam commodi reprehenderit impedit sit impedit inventore cumque culpa tenetur aperiam alias placeat ducimus provident eveniet.",
            "rating": 5,
            "date": "2023-07-09T05:00:00.000Z",
            "creatorName": "Sydney"
          },
          {
            "id": 73,
            "creatorId": 23,
            "productId": 1,
            "message": "Sit velit dolor minus sint porro quaerat accusantium tempore amet reprehenderit officiis sequi assumenda a distinctio maiores at illum dolor incidunt labore necessitatibus qui possimus harum animi dolores incidunt nam deleniti incidunt vel minus quasi cumque nobis laboriosam assumenda mollitia.",
            "rating": 1,
            "date": "2023-07-09T05:00:00.000Z",
            "creatorName": "Michael"
          }
        ],
        "averageReview": 3
      }
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
·message (string): "${Product} added to inventory"  
·product (object): New product that was created

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "WS Hat 2023 added to inventory",
    "product": {
      "id": 158,
      "name": "WS Hat 2023",
      "description": "Hat celebrating 2023 World Series Win",
      "price": "$12.00",
      "stockQuantity": 4,
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
·stockQuantity (number, optional): Amount of product in inventory  
·size (string, optional): Size of product being added, if applies

**Returned Data**  
·message (string): "${Product} has been updated"  
·product (object): Updated product

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "World Series Hat 2023 has been updated",
    "product": {
      "id": 3,
      "name": "World Series Hat 2023",
      "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      "price": "$188.00",
      "stockQuantity": 75,
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
·message (string): "${Product} has been deleted from inventory"  
·product (object): Product that was deleted

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Hat has been deleted from inventory",
    "product": {
      "id": 152,
      "name": "Hat",
      "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      "price": "$109.00",
      "stockQuantity": 74,
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
·message (string): "Your review has been submitted"  
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
·message (string): "Your review has been updated"  
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
·message (string): "Your review has been removed"  
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
·message: "New Persistant Cart Created"  
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
    "cart": {
      "id": 24,
      "userId": 2,
      "price": null,
      "orderStatus": "In Cart",
      "products": []
    }
  }
}
```

### PATCH /orders/place

**END USER ROUTE**

This route will be used by end user to convert their existing cart into a placed order.

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
·message: "Order has been placed"  
·order (object) containing the following key/value pairs  
···id (number): Order ID number  
···userId (number): The user ID of the user the cart belongs to  
···totalPrice (number): A sum of the (price x quanity) for each item in the order  
···orderStatus (enumerated list): "Order Placed"  
···products (array): A list of all products included in order

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Order has been placed",
    "order": {
      "id": 105,
      "userId": 73,
      "totalPrice": "$50.00",
      "orderStatus": "Order Placed",
      "products": [
        {
          "id": 10,
          "name": "Basketball",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          "price": "$25.00",
          "size": null,
          "quantity": 2
        }
      ]
    }
  }
}
```

### PATCH /orders/:orderId/complete

**ADMIN ROUTE**

This route will be used to convert placed order to completed order after the admin has shipped the product.

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**No Body Required**

**Returned Data**  
·message: "Order has been shipped/completed"  
·order (object) containing the following key/value pairs  
···id (number): Order ID number  
···userId (number): The user ID of the user the cart belongs to  
···totalPrice (number): A sum of the (price x quanity) for each item in the order  
···orderStatus (enumerated list): "Order Complete"  
···products (array): A list of all products included in order

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Order has been shipped/completed",
    "order": {
      "id": 105,
      "userId": 73,
      "totalPrice": "$50.00",
      "orderStatus": "Order Complete",
      "products": [
        {
          "id": 10,
          "name": "Basketball",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          "price": "$25.00",
          "size": null,
          "quantity": 2
        }
      ]
    }
  }
}
```

## <a name ="orders-products-endpoints"></a>ORDERS_PRODUCTS ENDPOINTS

[Go back to top of page](#api-docs)

### POST /orders_products/add

**END USERS ROUTE**

This route will be used to add products to an existing cart(order)

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·productId (number, required): ID of product being added to the order  
·quantity (number, required): Quantity of the product being added to the order

**Returned Data**  
·message: "Product Has been added to cart"  
cart (object): Updated cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product Has been added to cart",
    "cart": {
      "id": 105,
      "userId": 73,
      "totalPrice": "$50.00",
      "orderStatus": "In Cart",
      "products": [
        {
          "id": 10,
          "name": "Basketball",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          "price": "$25.00",
          "size": null,
          "quantity": 2
        }
      ]
    }
  }
}
```

### PATCH /orders_products/update

**END USERS ROUTE**

This route will be used to edit quantity of products in an existing cart(order)

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·productId (number, required): ID of product whose quantity is being changed  
·quantity (number, required): New quantity of the product included in the order

**Returned Data**  
·message: "Product Quantity has been updated"  
cart (object): Updated cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product Quantity has been updated",
    "cart": {
      "id": 105,
      "userId": 73,
      "totalPrice": "$100.00",
      "orderStatus": "In Cart",
      "products": [
        {
          "id": 10,
          "name": "Basketball",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          "price": "$25.00",
          "size": null,
          "quantity": 4
        }
      ]
    }
  }
}
```

### DELETE /orders_products/remove

**END USERS ROUTE**

This route will be used to remove products entitely from an existing cart(order)

**Headers:**  
**(object literal, required)**  
Content-Type (string, required): application/json  
Authorization (template literal,required): Bearer ${token}

**Body:**  
**(object, required) contains the following key/value pairs:**  
·productId (number, required): ID of product being removed from the order (cart)

**Returned Data**  
·message: "Product Has been deleted from cart"  
cart (object): Updated cart

**Sample Result**

```json
{
  "success": true,
  "data": {
    "message": "Product Has been deleted from cart",
    "cart": {
      "id": 105,
      "userId": 73,
      "totalPrice": "$0.00",
      "orderStatus": "In Cart",
      "products": []
    }
  }
}
```
