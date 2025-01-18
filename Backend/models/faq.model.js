import connectToDatabase from "../config/Db.js";
const connection = connectToDatabase();

const FAQService = {
  initializeTable: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS faqs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          answerWrittenBy VARCHAR(255) NOT NULL
        );
      `;

      await connection.query(createTableQuery);
      console.log("FAQ table checked/created successfully");
    } catch (err) {
      console.error("Error creating FAQ table:", err);
      throw err;
    }
  },

  create: async (question, answer, answerWrittenBy) => {
    try {
      const query = `
        INSERT INTO faqs (question, answer, answerWrittenBy) 
        VALUES (?, ?, ?)
      `;

      const [results] = await connection.query(query, [
        question,
        answer,
        answerWrittenBy,
      ]);
      console.log("FAQ created successfully:", results);
      return results;
    } catch (err) {
      console.error("Error inserting FAQ:", err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const query = "SELECT * FROM faqs WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.length === 0) {
        throw new Error("FAQ not found");
      }
      return result[0];
    } catch (err) {
      console.error("Error finding FAQ:", err);
      throw err;
    }
  },

  findByQuestion: async (question) => {
    try {
      const query = "SELECT * FROM faqs WHERE question = ?";
      const [result] = await connection.query(query, [question]);
      if (result.length === 0) {
        return null; // Question not found
      }
      return result[0]; // Return the FAQ with the matching question
    } catch (err) {
      console.error("Error finding FAQ by question:", err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const query = "SELECT * FROM faqs";
      const [result] = await connection.query(query);
      return result;
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      throw err;
    }
  },

  updateById: async (id, question, answer, answerWrittenBy) => {
    try {
      // Initialize query and parameters
      let query = `UPDATE faqs SET `;
      const params = [];
  
      // Dynamically build the SET clause based on provided values
      if (question !== undefined) {
        query += `question = ?, `;
        params.push(question);
      }
      if (answer !== undefined) {
        query += `answer = ?, `;
        params.push(answer);
      }
      if (answerWrittenBy !== undefined) {
        query += `answerWrittenBy = ?, `;
        params.push(answerWrittenBy);
      }
  
      // Remove trailing comma and space, add WHERE clause
      query = query.replace(/, $/, " ");
      query += `WHERE id = ?`;
      params.push(id);
  
      // Execute the query
      const [result] = await connection.query(query, params);
  
      if (result.affectedRows === 0) {
        throw new Error("FAQ not found");
      }
  
      return { id, question, answer, answerWrittenBy };
    } catch (err) {
      console.error("Error updating FAQ:", err);
      throw err;
    }
  },
  
  deleteById: async (id) => {
    try {
      const query = "DELETE FROM faqs WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("FAQ not found");
      }
      return { message: "FAQ deleted successfully" };
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      throw err;
    }
  },
};

// Ensure the table is initialized when the module is imported
(async () => {
  try {
    await FAQService.initializeTable();
  } catch (err) {
    console.error("Failed to initialize FAQ table:", err);
  }
})();

export default FAQService;
