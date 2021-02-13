# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
  - The report should be sent to the `/export` route of the investments service
  - The investments service expects the report to be sent as csv text
  - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
  - The holding should be the name of the holding account given by the financial-companies service
  - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean and reusable manner rather than seeing a perfect example, try to only spend arouns _1-2 hours_ working on it

Some questions we'd also like you to consider around this task:

1. What could you do to make this more secure?
2. How would you make this solution scale to millions of records?
3. What else would you have liked to improve given more time?

## Getting Started

Please clone this service and push it to your own github (or other) public repository

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route). Please add your new routes to the readme

### Existing routes

We have provided a series of routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
- `/investments/export/:investmentId` report csv data for a specific investment record by investmentId.

## What could be improved?

### Secure

- Endpoint could be authenticated using `passport` or whatever token library.
- Endpoint parameters could be validated using validation library like `Joi`.
- Secure cookie could be possible.
- Could prevent SQL Injection vulnerabilities.
- Could use `csurf` middleware to protect against cross-site request forgery.

### Scale to millions of records?

Currently using Promise.all() to handle asynchronous request for numerous records.

In case of millions of records, the code may throw timeout error because the Time complexity of `prepareCsvData` function is O(N^2). We can reduce this time complexity by redesigning database.

### What could be improved more?

- integration test using `cucumber` or whatever library.
- Docker containerization for handling microservices.
- Dynamic configuration handling for various environment like dev, prod.
