# Roman Numeral Converter

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Technologies Used](#technologies-used)

# Introduction

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

To stop the containers, press `Ctrl+C` in the terminal, click the "stop" button in the Docker application, or run:

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

# Technologies Used

## Frontend

#### Storybook

#### Testing Library

#### Cypress

#### Web-Vitals

## Backend

#### Express

#### Jest

#### Winston

#### OpenTelemetry

#### LRU-Cache
