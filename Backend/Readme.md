# Node.js CRUD API

This repository contains a simple Node.js CRUD (Create, Read, Update, Delete) API using Express.js and MongoDB. It allows you to manage user data with basic operations.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or a MongoDB connection URI.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ameer-ali-jamali/Node-CRUD-Api-s.git
   cd node-crud-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your MongoDB connection URI:

   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

4. Start the server:

   ```bash
   npm start
   ```

The API will be running at `http://localhost:3000`.

## API Endpoints

### Create User

- **Endpoint:** `POST /employee`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "secretpassword",
    "phone": "123-456-7890",
    "profilePic": "/directory/image.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "status": true,
    "message": "User created successfully",
    "data": {
      "_id": "1234567890",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "profilePic": "/directory/image.jpg"
    }
  }
  ```

### Read All employee

- **Endpoint:** `GET /employee`
- **Response:**
  ```json
  {
    "status": true,
    "data": [
      {
        "_id": "1234567890",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "profilePic": "/directory/image.jpg"
      }
      // Additional employee...
    ]
  }
  ```

### Read One User

- **Endpoint:** `GET /employee/:id`
- **Response:**
  ```json
  {
    "status": true,
    "data": {
      "_id": "1234567890",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "profilePic": "/directory/image.jpg"
    }
  }
  ```

### Update User

- **Endpoint:** `PUT /employee/:id`
- **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "phone": "987-654-3210"
  }
  ```
- **Response:**
  ```json
  {
    "status": true,
    "message": "User updated successfully",
    "data": {
      "_id": "1234567890",
      "name": "Updated Name",
      "email": "john.doe@example.com",
      "phone": "987-654-3210",
      "profilePic": "/directory/image.jpg"
    }
  }
  ```

### Delete User

- **Endpoint:** `DELETE /employee/:id`
- **Response:**
  ```json
  {
    "status": true,
    "message": "User deleted successfully",
    "data": {
      "_id": "1234567890",
      "name": "Updated Name",
      "email": "john.doe@example.com",
      "phone": "987-654-3210",
      "profilePic": "/directory/image.jpg"
    }
  }
  ```

## Contributing

Feel free to contribute to the project by opening issues or pull requests. Any suggestions or improvements are welcome!

## License

This project is licensed under the [MIT License](LICENSE).
