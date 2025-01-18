import connectToDatabase from "../config/Db.js";
const connection =  connectToDatabase();

const Service = {
    initializeTable: async () => {
        try {
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS services (
              id INT AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              image VARCHAR(255) NOT NULL
            );
          `;
     
          await connection.query(createTableQuery);
          console.log("Table checked/created successfully");
        } catch (err) {
          console.error("Error creating table:", err);
          throw err;
        }
      },
    
      create: async (title, description, image) => {
        try {
          const query = `
            INSERT INTO services (title, description, image) 
            VALUES (?, ?, ?)
          `;
        
          const [results] = await connection.query(query, [
            title,
            description,
            image,
          ]);
          console.log("Service created successfully:", results);
          return results;
        } catch (err) {
          console.error("Error inserting data:", err);
          throw err;
        }
      },

  findById: async (id) => {
    try {
      const query = "SELECT * FROM services WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.length === 0) {
        throw new Error("Service not found");
      }
      return result[0];
    } catch (err) {
      console.error("Error finding service:", err);
      throw err;
    }
  },

  findByTitle: async (title) => {
    try {
      const query = "SELECT * FROM services WHERE title = ?";
      const [result] = await connection.query(query, [title]);
      if (result.length === 0) {
        return null; // Title not found
      }
      return result[0]; // Return the service with the matching title
    } catch (err) {
      console.error("Error finding service by title:", err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const query = "SELECT * FROM services";
      const [result] = await connection.query(query);
      return result;
    } catch (err) {
      console.error("Error fetching services:", err);
      throw err;
    }
  },

  updateById: async (id, title, description, image) => {
    try {
      const query = `
        UPDATE services 
        SET title = ?, description = ?, image = ? 
        WHERE id = ?
      `;
      const [result] = await connection.query(query, [
        title,
        description,
        image,
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Service not found");
      }
      return { id, title, description, image };
    } catch (err) {
      console.error("Error updating service:", err);
      throw err;
    }
  },

  deleteById: async (id) => {
    try {
      const query = "DELETE FROM services WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Service not found");
      }
      return { message: "Service deleted successfully" };
    } catch (err) {
      console.error("Error deleting service:", err);
      throw err;
    }
  },
};

// Ensure the table is initialized when the module is imported
(async () => {
  try {
    await Service.initializeTable();
  } catch (err) {
    console.error("Failed to initialize table:", err);
  }
})();

export default Service;
