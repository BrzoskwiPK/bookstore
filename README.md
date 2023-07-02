# Bookstore-app

**The bookstore-app is a final project created for the "Programowanie aplikacji back-endowych" course.**

### Navigation

---

1. [Getting Started](#getting-started)

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [How to ...](#how-to)
  - [How to install dependencies](#how-to-install-dependencies)
  - [How to run application](#how-to-run-application)
  - [How to run tests](#how-to-run-tests)
- [Microservices](#microservices)
- [Contributor](#contributor)
- [Application demo](#application-demo)

## Introduction

Bookstore-app is a full-stack application resembling an online bookstore. We can display the books available in the database, and then select some and purchase them. The history of user purchases is available in the form of a table listing his shopping carts.

## Architecture

The Bookstore App follows the Onion Architecture pattern. This architectural approach emphasizes the separation of concerns and provides a clear distinction between the business logic, infrastructure, and external dependencies. The architecture is divided into layers, with the innermost layer containing the core business logic and the outer layers handling infrastructure and communication with external services. Particular calls to the API require authorization, which is checked by middleware. User can get access to all of the microservices via API. Here is the list of endpoints:

**AuthService: PORT 3003**
- POST /register
  
<p>{
  "username": "user",
  "email": "user@gmail.com",
  "password": "password",
  "passwordConfirmation": "password" }
</p>

- POST /login
  
<p>{
  "username": "admin@gmail.com",
  "password": "password"
}</p>

- GET /loadUser
- POST /refreshToken

**BookService: PORT 3001**
- POST /books
- GET /books/:bookId
- PUT /books/:bookId
- DELETE /books/:bookId
- GET /books

**CartService: PORT 3002**
- POST /carts
- POST /userCarts
- GET /carts/:cartId
- PUT /carts/:cartId
- DELETE /carts/:cartId
- POST /carts/:cartId/items
- DELETE /carts/:cartId/items/:itemId

**PaymentService: PORT 3005**
- POST /payment

## Technologies

The Bookstore App is built using the following technologies:

#### Backend

- Node.js - A JavaScript runtime for executing server-side code.
- Express.js - A fast and minimalist web application framework for Node.js.
- MongoDB - A NoSQL database for storing application data.

#### Frontend

- React - A JavaScript library for building user interfaces.
- TypeScript - A typed superset of JavaScript that compiles to plain JavaScript.
- Material-UI - A popular UI framework for React that provides pre-designed components and styles.

## Prerequisites

- Docker - [Install](https://www.docker.com/products/docker-desktop/)
- IDE (e.g. Visual Studio Code) - [Install](https://code.visualstudio.com/download)
- Node + NPM - [Recommended NVM](https://github.com/nvm-sh/nvm)

## How to

#### How to install dependencies

In order to run the application, we will need to:

- Dockerize the database - MongoDB
- Install backend and frontend dependencies
- Seed the database

Let's begin with creating a container that contains our local instance of database. I have already prepared _docker-compose.yml_ file that does all the stuff.

1. Clone the repository from GitHub and navigate to the main directory of the project.
2. Open the terminal and run the command:
   `docker-compose up -d`.
3. It may take a few moments to complete, you can watch the progress visible in the terminal.
4. Once container is ready and started, change the directory to: _/backend_.
5. Run the command `npm i` and wait until all dependencies are installed.
6. Now go to the _/frontend_ directory and repeat the installation by running the `npm i` command.
7. Once all dependencies are installed, we can now seed the database with a previously created script. Just come back to the /_backend_ directory.
8. Run the **npm run seed** command and wait until a log saying that seeding the database was successful appears. Then just terminate the job.

Script should load two test users to the database.<br>One of them has elevated privileges (admin) and one is just a standard user (standard).<br>
Here you can find authentication credentials:

**ADMIN**

- **Login:** admin@gmail.com
- **Password:** password

**STUDENT**

- **Login:** standard@gmail.com
- **Password:** password

#### How to run application

1. Open Docker Desktop and check if your container with MongoDB is running.
2. In order to run the backend, navigate to _/backend_ directory and run `npm run dev` command.
3. In order to run the frontend, navigate to _/frontend_ directory and run `npm run dev` command.

Application should be running. You can check that by visiting [homepage](http://localhost:5173/).

#### How to run tests

1. Backend tests can be run by running `npm run test` command in the _/backend_ directory.
2. Frontend tests can be run by running `npm run test` command in the _/frontend_ directory.

---

#### Microservices

The Bookstore App consists of four microservices, each responsible for a specific aspect of the application. Here is an overview of each microservice:

1. **Auth** <br/>
   The Auth microservice handles user authentication and registration through its API. It provides endpoints for user login and registration, and it utilizes middleware for request authentication and authorization. Users can obtain access tokens by providing valid credentials, which can then be used to authenticate subsequent requests to the other microservices. <br/><br/>

2. **Books** <br/>
   The Books microservice enables users to browse books stored in the database and perform basic CRUD operations on them. It provides endpoints for retrieving a list of books, retrieving a specific book by its ID, adding a new book, updating an existing book, and deleting a book. This microservice is responsible for managing the book catalog and ensuring data consistency. <br/><br/>

3. **Cart** <br/>
   The Cart microservice manages the shopping cart functionality for each user. It allows users to add books to their cart, update quantities, and remove items. The Cart microservice also handles the calculation of the total price and keeps track of the items selected by a specific user. The cart functionality is closely tied to the user's session and allows for a seamless shopping experience. <br/><br/>

4. **Payments**
   The Payments microservice is a mock payment system within the application. It allows users to finalize their orders by simulating the payment process. This microservice provides an endpoint for confirming and completing the payment transaction. While it does not handle actual financial transactions (as this application is only for educational purposes), it demonstrates the integration of a payment system in the application.

#### Contributor

- Gabriel Brzoskwinia

#### Application demo

Here you can find some screenshots that show basic functionality of this application.

**<p align="center">HomePage - unauthorized user</p>**

![unauthorized](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/cc5b5283-3e8a-46e9-ba4b-8a881d008218)

**<p align="center">HomePage - authorized user</p>**

![authorized](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/5c65007d-82ac-40fa-94ee-9db6afc712ef)

**<p align="center">Custom 404</p>**

![404](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/c661e4ec-6acf-4c46-8fca-b36f16fc554e)

**<p align="center">LoginPage</p>**

![login](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/c54363ab-ed8c-41a9-ab1f-2728a94c7a54)

**<p align="center">SignUpPage</p>**

![signup](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/20250d44-1288-4ce4-9293-740995c2ab2a)

**<p align="center">Bookshelf</p>**

![bookshelf](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/7b84776f-5c9d-4780-8b43-d78cf7c34690)

**<p align="center">Cart</p>**

![cart](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/52e46d27-3839-4881-bad7-8a5de1d6ff7f)

**<p align="center">Orders</p>**

![orders](https://github.com/BrzoskwiPK/bookstore-app/assets/101000424/aafb6170-b408-4b00-8876-7a22a93f966a)
