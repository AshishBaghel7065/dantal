import Blog from "../models/blog.model.js";

// Create a new blog
export const createblog = async (req, res) => {
  try {
    const { title, dateofPost, description, image } = req.body;

    if (!title || !description || !dateofPost || !image) {
      return res.status(400).json({
        message: "Missing title, description, date of post, or image",
        success: false,
      });
    }

    const existingBlog = await Blog.findByTitle(title);
    if (existingBlog) {
      return res.status(400).json({
        message: "Blog already exists",
        success: false,
      });
    }

    const newBlog = await Blog.create(title, dateofPost, description, image);

    const getBlog = await Blog.findById(newBlog.insertId);
    if (!getBlog) {
      return res.status(400).json({
        message: "Failed to retrieve the newly created blog",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      blog: getBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    return res.status(200).json({
      message: "Blogs retrieved successfully",
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog retrieved successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dateofPost, description, image } = req.body;

    if (!title || !description || !dateofPost || !image) {
      return res.status(400).json({
        message: "Missing title, description, date of post, or image",
        success: false,
      });
    }

  //  const existingBlog = await Blog.findByTitle(title)
  //   if(existingBlog){
  //     return res.status(400).json({
  //       message: "Blog Aready  Available choose Diffent title for  Blog",
  //       success: false,
  //     });
  //   }

    const updatedBlog = await Blog.updateById(id , title, dateofPost ,description , image);

    const getUpdatedBlog = await Blog.findById(id)
    if(!getUpdatedBlog){
        return res.status(200).json({
            message: "Updated Blog Is Not Found",
            success: true,

          });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      blog: getUpdatedBlog,
    });

  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.message === "Blog not found") {
      return res.status(404).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.deleteById(id);
    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    if (error.message === "Blog not found") {
      return res.status(404).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
