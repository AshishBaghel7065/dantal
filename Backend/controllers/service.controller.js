import connectToDatabase from "../config/Db.js";
import Service from "../models/Service.model.js";

const connection = connectToDatabase();

export const CreateService = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Validate required fields
    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Title, Description, and Image are required",
        success: false,
      });
    }

    // Check if the service already exists by title
    const existingService = await Service.findByTitle(title);
    if (existingService) {
      return res.status(409).json({
        message: "A service with this title already exists",
        success: false,
      });
    }

    // Create a new service using your Service model's create method
    const newService = await Service.create(title, description, image);
    if (!newService) {
      return res.status(500).json({
        message: "Error occurred while creating the service",
        success: false,
      });
    }

    const getServicebyId = await Service.findById(newService.insertId);

    // Return the newly created service data in the response
    return res.status(201).json({
      message: "Service created successfully",
      success: true,
      data: getServicebyId,
    });
  } catch (err) {
    console.error("Error creating service:", err);

    // Handle server errors
    return res.status(500).json({
      message: "An error occurred while creating the service",
      success: false,
      error: err.message,
    });
  }
};

export const UpdateSerivce = async (req, res) => {
  const ServiceId = req.params.id;

  console.log(ServiceId);
  const { title, description, image } = req.body;
  try {
    // Validate required fields
    if (!title || !description || !image) {
      return res.status(400).json({
        message: "Title, Description, and Image are required",
        success: false,
      });
    }

    // const getServicebyId = await Service.findByTitle(title);
    // if (getServicebyId) {
    //   return res.status(500).json({
    //     massage: "Title is Already Created please choose Different title",
    //     status: true,
    //   });
    // }

    const updateServicebyId = await Service.updateById(
      ServiceId,
      title,
      description,
      image
    );
    const getupdatedServicebyId = await Service.findById(ServiceId);

    // Return the newly created service data in the response
    return res.status(201).json({
      message: "Service updated successfully",
      success: true,
      data: getupdatedServicebyId,
    });
  } catch (err) {
    console.error("Error creating service:", err);

    // Handle server errors
    return res.status(500).json({
      message: "An error occurred while creating the service",
      success: false,
      error: err.message,
    });
  }
};

export const getAllService = async (req, res) => {
  try {
    // Fetch all services (assuming getAll is asynchronous)
    const allService = await Service.getAll();

    // Return a success response with the data
    return res.status(200).json({
      message: "All services retrieved successfully.",
      success: true,
      data: allService,
    });
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({
      message: "An error occurred while retrieving services.",
      success: false,
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  const serviceId = req.params.id;

  try {
    // Attempt to delete the service
    const deletedService = await Service.deleteById(serviceId);

    // Check if a service was actually deleted
    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found.",
        success: false,
      });
    }

    // Return success response
    return res.status(200).json({
      message: "Service deleted successfully.",
      success: true,
      data: deletedService,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: "An error occurred while deleting the service.",
      success: false,
      error: error.message,
    });
  }
};

export const getDataById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const getUser = await Service.findById(serviceId);

    if (!getUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully.",
      success: true,
      data: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the user.",
      success: false,
      error: error.message,
    });
  }
};
