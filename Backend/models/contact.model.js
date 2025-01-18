import connectToDatabase from "../config/Db.js";
const connection = connectToDatabase();

const Contact = {
  // Initialize the contacts table
  initializeTable: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          fullName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          appointmentDate DATE,
          message TEXT
        );
      `;
      await connection.query(createTableQuery);
      console.log("Contact table checked/created successfully");
    } catch (err) {
      console.error("Error creating contact table:", err);
      throw err;
    }
  },

  // Create a new contact
  createContact: async (fullName, email, phone, appointmentDate, message) => {
    try {
      const query = `
        INSERT INTO contacts (fullName, email, phone, appointmentDate, message) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const [results] = await connection.query(query, [
        fullName,
        email,
        phone,
        appointmentDate,
        message
      ]);
      console.log("Contact created successfully:", results);
      return results;
    } catch (err) {
      console.error("Error inserting contact data:", err);
      throw err;
    }
  },

  // Get all contacts
  getAllContacts: async () => {
    try {
      const query = "SELECT * FROM contacts";
      const [result] = await connection.query(query);
      return result;
    } catch (err) {
      console.error("Error fetching contacts:", err);
      throw err;
    }
  },

  // Get a contact by ID
  getContactById: async (id) => {
    try {
      const query = "SELECT * FROM contacts WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.length === 0) {
        throw new Error("Contact not found");
      }
      return result[0]; // Return the contact found by ID
    } catch (err) {
      console.error("Error finding contact by ID:", err);
      throw err;
    }
  },

  // Check if a contact exists by email
  checkByEmail: async (email) => {
    try {
      const query = "SELECT * FROM contacts WHERE email = ?";
      const [result] = await connection.query(query, [email]);
      if (result.length > 0) {
        return result[0]; // Return the contact if found
      }
      return null; // Return null if no contact is found with the email
    } catch (err) {
      console.error("Error checking contact by email:", err);
      throw err;
    }
  },

  // Delete a contact by ID
  deleteContact: async (id) => {
    try {
      const query = "DELETE FROM contacts WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Contact not found or already deleted");
      }
      console.log("Contact deleted successfully");
      return result;
    } catch (err) {
      console.error("Error deleting contact:", err);
      throw err;
    }
  }
};

// Ensure the contacts table is initialized when the module is imported
(async () => {
  try {
    await Contact.initializeTable();
  } catch (err) {
    console.error("Failed to initialize contact table:", err);
  }
})();

export default Contact;
