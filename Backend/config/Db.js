import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Function to create and connect to the MySQL database using a connection pool
function connectToDatabase() {
  // Create a connection pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST,         // Use the host from .env
    user: process.env.DB_USER,         // Use the username from .env
    password: process.env.DB_PASSWORD, // Use the password from .env
    database: process.env.DB_NAME,     // Use the database name from .env
    waitForConnections: true,          // Enable waiting for available connections
    connectionLimit: 10,               // Limit number of concurrent connections
    queueLimit: 0                      // No limit on the number of requests waiting for a connection
  });

  // Return the promise-based API for the pool
  return pool.promise(); // This gives you a promise-based interface
}

export default connectToDatabase;

