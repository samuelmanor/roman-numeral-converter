# Roman Numeral Converter

## Table of Contents

- [Installation](#installation)
- [Commands](#commands)
- [Technologies Used](#technologies-used)

# Installation

### 1. Fork and clone the repository

Click the **Fork** button in the top right corner of the GitHub repository to create a copy on your own account.
Once forked, open a terminal and run the command:

```bash
  git clone https://github.com/<your-username>/roman-numeral-converter.git
```

Then navigate into the project:

```bash
  cd roman-numeral-converter
```

### 2. Set up the app with Docker

First, make sure you have [Docker](https://docs.docker.com/get-started/get-docker/).
Then, build and start the application with:

```bash
  docker-compose up --build
```

This builds the Docker images for both the frontend and backend, then starts and connects them.

Once the app is running, it should be available at:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8080`

To stop the containers, run:

```bash
  docker-compose down
```

### 3. Running the app manually (without Docker)

Open one terminal to serve the purposes for the backend, and navigate to the correct folder:

```bash
  cd backend
```

Then install dependencies:

```bash
  npm install
```

And finally, start the backend server:

```bash
  npm start
```

The backend service will be available at `http://localhost:8080`, just like when it's set up with Docker.

For the frontend, open another terminal and navigate to the frontend folder:

```bash
  cd frontend
```

Install dependencies:

```bash
  npm install
```

Then start the frontend server:

```bash
  npm start
```

The frontend will can be accessed via `https://localhost:3000`, also just like with Docker.

# Commands

### Frontend

To run tests, first navigate to the frontend folder.
The following command runs Testing Library tests:

```bash
  npm run test
```

And this runs the end-to-end Cypress tests:

```bash
  npm run cypress:open
```

To open the Storybook interface, run the following:

```bash
  npm run storybook
```

### Backend

To run tests on the backend, navigate to the backend folder and run:

```bash
  npm run test
```

This will run the tests for both the Express route and the `toRoman` function.

# Technologies Used

## Frontend

The frontend is made up of two React components: NumeralConverter, and its child component NumberInput. I decided abstract away the TextField on the form into a separate component because it has very specific validation behavior, which is unrelated to the rest of the NumeralConverter form. This behavior ensures that a user cannot successfully send a request to the backend unless the input into that field is valid.

I developed this under the assumption that this project/repo would be maintained long-term, and might someday need to expand in scope, which informed some of my decisions on what technologies to use:

#### Storybook

I implemented stories for both components (NumeralConverter and NumberInput) for a few reasons. I like that Storybook provides a place to develop UI components that's completely separate from the rest of the app, so that a component's functionality and appearance can be figured out in isolation. It also provides a pretty handy place to look through and organize components when you start to have dozens of them within a project. You can also write tests within a given story to verify behavior.

#### Testing Library & Cypress

Each component also has its own test file, written with Testing Library. I used `userEvent`s to mimic user behavior within the tests to make sure they're behaving as expected on a component level. Then, for end-to-end testing, I decided to use Cypress. I find it similarly useful to simulate a user's interactions (especially in a browser environment) to verify application behavior.

## Backend

The backend is a single Express route, `/romannumeral`. It accepts a parameter and validates that it can convert what its been given to a roman numeral (using the `toRoman` function), returning an error if needed. I wrote argument validation in the route itself as well as the function it uses for the Roman numeral conversion, under the assumtion that someday a component other than NumeralConverter may need to use that endpoint, and that an endpoint other than `/romannumeral` might need to use that function.

#### Express

I used Express to set up the backend because of how minimal and flexible it is to work with, and because I've had prior experience with it.

#### Supertest

To test how the route handles both valid and invalid input, I wrote some tests using Supertest to send requests to the route.

#### Winston

Winston provides a simple function to log incoming requests to the console. I customized the message template to include a timestamp, the HTTP method used, the query provided, etc. It also logs messages into a .log file, with error messages going into their own file called error.log.

#### LRU-Cache

I used this to implement a simple LRU cache to reduce the load on the backend. If a given query exists in the cache, the route will return the output from the cache object instead of re-running the `toRoman` function. If a query does not previously exist in the cache, it will be added, but the cache deletes the least recently used items. I wanted to add this to optimize performance/reduce the load on the backend.

## Observability

The app is monitored in a few different ways. Winston logs incoming requests, and OpenTelemetry logs metrics/traces to the console (though the line that adds this functionality is commented out, since it logs so much). Right-clicking, then clicking inspect and going into the Perfomance tab shows the readout from Web-Vitals. There's also a Sentry integration, which also monitors performance as well as errors, to keep track of any errors that might come up in production that didn't during development.
