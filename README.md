# CMS Server

This is a simple CMS server built using Node.js, Express, and MongoDB for managing user authentication and administrative actions. The server exposes RESTful APIs for authentication and user-related actions.

## Features

- 🔑 **User Authentication**: Handles user login and registration.
- 🛠️ **Admin Routes**: Admin-specific routes for managing users and other actions.
- 🌍 **Cross-Origin Resource Sharing (CORS)**: Supports cross-origin requests to allow the frontend to interact with the backend.
- 📥 **Body Parsing**: Handles incoming JSON and URL-encoded data.

## Technologies

- 🚀 Node.js
- ⚡ Express.js
- 🗄️ MongoDB (via Mongoose)
- 🌐 CORS
- 📝 Body-Parser


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cms-server.git
cd cms-server



```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MongoDB

Make sure you have MongoDB installed and running. Update your `dbConnect.js` file to use your MongoDB URI.

### 4. Start the server

```bash
npm start
```

The server will start on `http://localhost:4000`.

## API Endpoints

### Authentication Routes

- **POST `/api/auth/register`**: Register a new user.
- **POST `/api/auth/login`**: Login with an existing user.

### Admin Routes

- **GET `/api/actions/users`**: Get the list of users (for admin purposes).
- **POST `/api/actions/users`**: Create a new user (admin only).
- **PUT `/api/actions/users/:id`**: Update user information (admin only).
- **DELETE `/api/actions/users/:id`**: Delete a user (admin only).

## Configuration

### `dbConnect.js`

The `dbConnect.js` file handles the connection to MongoDB. Ensure that your MongoDB URI is correctly configured in this file.

### `authRoutes.js` and `userRoutes.js`

These files contain the routes for user authentication and admin actions respectively.

## Environment Variables

Ensure you set up environment variables such as your MongoDB connection string and any secret keys used for JWT authentication.

## License

This project is licensed under the MIT License.

```
