# Medical API App

This is an Express JS application for managing medical data, including medications and user accounts.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Running the App](#running-the-app)
- [Endpoints](#endpoints)

## Requirements

- Node.js (version 20 or later)
- Docker

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd medical_client

   ```

2. Install the dependencies

`npm install`

## Environment variables

```at .env

PORT=3000
JWT_SECRET=
REFRESH_SECRET=
```

## Docker setup

1. Build and start Docker containers

`docker-compose up --build`

2. If you need to stop the containers, you can use:

`docker-compose down`

## Run the application

1. Would be available at `http://localhost:13000`

## Endpoints

## Authentication

Endpoints may require authentication. Use the following headers for requests that need authentication:

### Users

1. Create User

- **Endpoint**: `/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
  	"name": "John Doe",
  	"email": "john@example.com",
  	"password": "securepassword"
  }
  ```

2. Login

- **Endpoint**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
  	"email": "john@example.com",
  	"password": "securepassword"
  }
  ```

### Medications

1. Create Medication

- **Endpoint**: `/medications`
- **Method**: `POST`
- **Headers**: `Authentication : Token <your_token>`
- **Request Body**:
  ```json
  {
  	"name": "Aspirin",
  	"description": "Pain reliever",
  	"count": 10,
  	"destination_count": 5,
  	"user_id": 1
  }
  ```

2. Update Medication

- **Endpoint**: `/medications/:id`
- **Method**: `PUT`
- **Headers**: `Authentication : Token <your_token>`
- **Request Body**:
  ```json
  {
  	"name": "Aspirin",
  	"description": "Pain reliever",
  	"count": 10,
  	"destination_count": 5,
  	"user_id": 1
  }
  ```

3. Delete Medication

- **Endpoint**: `/medications/:id`
- **Headers**: `Authentication : Token <your_token>`
- **Method**: `Delete`

4. Get Medications

- **Endpoint**: `/medications`
- **Headers**: `Authentication : Token <your_token>`
- **Method**: `GET`
