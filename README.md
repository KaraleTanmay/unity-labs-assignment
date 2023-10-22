# backend Assignment

This repository contains a project that allows users to interact with a web application for buying and selling products. Below are the instructions for running the project and a brief overview of its features.

## Getting Started

To get this project up and running on your local machine, follow these steps:

1.  Clone this repository and open it with your preferred code editor.
2.  In the terminal, navigate to the project directory and run the following command to install the project dependencies:

    ```bash

    `npm install`
    ```

3.  Ensure that you have MongoDB installed on your system. If not, you can download it from [MongoDB's official website](https://www.mongodb.com/try/download/community).
4.  By default, the project is configured to connect to a MongoDB database at `mongodb://127.0.0.1:27017/unitylabs_tanmay`. You can change the database connection string by modifying the `MONGO_STRING` variable in the `configure.env` file.
5.  Optionally, you can add dummy data to the database by running the following command:

    bashCopy code

    `npm run setup`

6.  Start the server by running the following command:

    bashCopy code

    `npm start`

The server will run on port `8000`.

## Authentication Endpoints

### Register as a New User

To register as a new user, send a POST request to the following endpoint:

arduinoCopy code

`POST 127.0.0.1:8000/api/auth/register`

Use the following JSON data format:

jsonCopy code

`{     "email": "youremail@gmail.com",     "username": "username",     "password": "password",     "passwordConfirm": "password",     "usertype": "seller" }`

The `usertype` can be "buyer" or "seller".

### Login

To log in, send a POST request to the following endpoint:

bashCopy code

`POST 127.0.0.1:8000/api/auth/login`

Use the following JSON data format:

jsonCopy code

`{     "username": "username",     "password": "password" }`

## Buyer Endpoints

Note: You must register yourself as a buyer to access these endpoints. The server creates a JWT and sends it as a cookie. Make sure that cookies are enabled in your client (e.g., Postman) to work with these endpoints.

1.  Get the List of Sellers

    Send a GET request to:

    bashCopy code

    `GET 127.0.0.1:8000/api/buyer/list-of-sellers`

2.  Get the Catalog of a Seller

    Send a GET request to:

    bashCopy code

    `GET 127.0.0.1:8000/api/buyer/seller-catalog/:sellerID`

3.  Create an Order

    To create an order, send a POST request to:

    sqlCopy code

    `POST 127.0.0.1:8000/api/buyer/create-order/:sellerID`

    Use the following JSON data format:

    jsonCopy code

    `{     "products": [         {             "productId": "product id",             "quantity": quantity (number)         },         {             "productId": "product id",             "quantity": quantity (number)         }     ] }`

## Seller Endpoints

Note: You must register yourself as a seller to access these endpoints. The server creates a JWT and sends it as a cookie. Make sure that cookies are enabled in your client (e.g., Postman) to work with these endpoints.

### New Seller Endpoints

Two new endpoints have been added to create a new product and to get all products.

1.  Get All Products

    Send a GET request to:

    bashCopy code

    `GET 127.0.0.1:8000/api/seller/products`

2.  Create a New Product

    To create a new product, send a POST request to:

    bashCopy code

    `POST 127.0.0.1:8000/api/seller/create-product`

    Use the following JSON data format:

    jsonCopy code

    `[     {         "name": "product name",         "price": price (number)     } ]`

3.  Create Catalog

    To create a catalog, send a POST request to:

    bashCopy code

    `POST 127.0.0.1:8000/api/seller/create-catalog`

    Use the following JSON data format:

    jsonCopy code

    `{     "name": "name of your catalog",     "products": [         "ids of products you want to order separated by a comma"     ] }`

4.  Get All Orders

    Send a GET request to:

    bashCopy code

    `GET 127.0.0.1:8000/api/seller/orders`

## Postman Workspace

During development, a Postman workspace was used. You can access it by clicking the following URL:

[Postman Workspace](https://app.getpostman.com/join-team?invite_code=aa31bd58e7ceca189da01824264c6740&target_code=eb4bdff50d19e3103a60e25c70cd572f)

## Contact

For any queries or assistance, feel free to contact the project owner:

Email: [tanmaykarale8112@gmail.com](mailto:tanmaykarale8112@gmail.com)

---

Feel free to use this README as a template for your own project's documentation. Enjoy using the application!
