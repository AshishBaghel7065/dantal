import connectToDatabase from "../config/Db.js";
const connection = connectToDatabase();

const Blog = {
  initializeTable: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          dateofPost VARCHAR(255)  NOT NULL,
          description TEXT NOT NULL,
          image VARCHAR(255) NOT NULL
        );
      `;

      await connection.query(createTableQuery);
      console.log("Blog table checked/created successfully");
    } catch (err) {
      console.error("Error creating blog table:", err);
      throw err;
    }
  },

  create: async (title, dateofPost, description, image) => {
    try {
      const query = `
        INSERT INTO blogs (title, dateofPost, description, image) 
        VALUES (?, ?, ?, ?)
      `;

      const [results] = await connection.query(query, [
        title,
        dateofPost,
        description,
        image,
      ]);
      console.log("Blog created successfully:", results);
      return results;
    } catch (err) {
      console.error("Error inserting blog data:", err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const query = "SELECT * FROM blogs WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.length === 0) {
        throw new Error("Blog not found");
      }
      return result[0];
    } catch (err) {
      console.error("Error finding blog by ID:", err);
      throw err;
    }
  },

  findByTitle: async (title) => {
    try {
      const query = "SELECT * FROM blogs WHERE title = ?";
      const [result] = await connection.query(query, [title]);
      if (result.length === 0) {
        return null; // Blog title not found
      }
      return result[0]; // Return the blog with the matching title
    } catch (err) {
      console.error("Error finding blog by title:", err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const query = "SELECT * FROM blogs";
      const [result] = await connection.query(query);
      return result;
    } catch (err) {
      console.error("Error fetching blogs:", err);
      throw err;
    }
  },

  updateById: async (id, title, dateofPost, description, image) => {
    try {
      const query = `
        UPDATE blogs 
        SET title = ?, dateofPost = ?, description = ?, image = ? 
        WHERE id = ?
      `;
      const [result] = await connection.query(query, [
        title,
        dateofPost,
        description,
        image,
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Blog not found");
      }
      return { id, title, dateofPost, description, image };
    } catch (err) {
      console.error("Error updating blog:", err);
      throw err;
    }
  },

  deleteById: async (id) => {
    try {
      const query = "DELETE FROM blogs WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Blog not found");
      }
      return { message: "Blog deleted successfully" };
    } catch (err) {
      console.error("Error deleting blog:", err);
      throw err;
    }
  },
};

// Ensure the table is initialized when the module is imported
(async () => {
  try {
    await Blog.initializeTable();
  } catch (err) {
    console.error("Failed to initialize blog table:", err);
  }
})();

export default Blog;
