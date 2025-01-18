import connectToDatabase from "../config/Db.js";
const connection = connectToDatabase();

const AdminService = {
  // Initialize Admin table
  initializeTable: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          refreshToken TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await connection.query(createTableQuery);
      console.log("Admin table checked/created successfully");
    } catch (err) {
      console.error("Error creating Admin table:", err);
      throw err;
    }
  },

  // Create or update the single Admin
  createOrUpdate: async (name, email, password, refreshToken) => {
    try {
      // Check if an admin already exists
      const query = "SELECT * FROM admins WHERE id = 1"; // Assumes there's only one admin
      const [existingAdmin] = await connection.query(query);

      if (existingAdmin.length > 0) {
        // If the admin exists, update the record
        const updateQuery = `
          UPDATE admins 
          SET name = ?, email = ?, password = ?, refreshToken = ? 
          WHERE id = 1
        `;
        const [updateResult] = await connection.query(updateQuery, [
          name,
          email,
          password,
          refreshToken,
        ]);
        console.log("Admin updated successfully:", updateResult);
      } else {
        // If the admin does not exist, create the record
        const insertQuery = `
          INSERT INTO admins (name, email, password, refreshToken) 
          VALUES (?, ?, ?, ?)
        `;
        const [insertResult] = await connection.query(insertQuery, [
          name,
          email,
          password,
          refreshToken,
        ]);
        console.log("Admin created successfully:", insertResult);
      }
    } catch (err) {
      console.error("Error creating or updating Admin:", err);
      throw err;
    }
  },

  // Get the single Admin
  getAdmin: async () => {
    try {
      const query = "SELECT * FROM admins WHERE id = 1"; // Assumes there's only one admin
      const [result] = await connection.query(query);
      if (result.length === 0) {
        throw new Error("Admin not found");
      }
      return result[0]; // Return the only admin record
    } catch (err) {
      console.error("Error finding Admin:", err);
      throw err;
    }
  },

  // Get Admin by Email
  getAdminByEmail: async (email) => {
    try {
      const query = "SELECT * FROM admins WHERE email = ?";
      const [result] = await connection.query(query, [email]);
      if (result.length === 0) {
        throw new Error("Admin not found with this email");
      }
      return result[0]; // Return the admin with the matching email
    } catch (err) {
      console.error("Error finding Admin by email:", err);
      throw err;
    }
  },
};

// Ensure the table is initialized when the module is imported
(async () => {
  try {
    await AdminService.initializeTable();
  } catch (err) {
    console.error("Failed to initialize Admin table:", err);
  }
})();

export default AdminService;
