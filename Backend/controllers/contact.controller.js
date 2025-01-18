import Contact from "../models/contact.model.js";

// Create a new contact
export const postContact = async (req, res) => {
  const { fullName, email, phone, appointmentDate, message } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !appointmentDate || !message) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Check if the contact with the same email already exists
    const existingUser = await Contact.checkByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Contact with this email already exists",
      });
    }

    // Create a new contact if no duplicate email is found
    const contact = await Contact.createContact(
      fullName,
      email,
      phone,
      appointmentDate,
      message
    );

    return res.status(201).json({
      message: "Contact created successfully",
      contact,
    });
  } catch (err) {
    console.error("Error creating contact:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAllContacts();
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Get a contact by ID
export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.getContactById(id);
    return res.status(200).json(contact);
  } catch (err) {
    console.error("Error fetching contact by ID:", err);
    return res.status(404).json({
      message: "Contact not found",
    });
  }
};


// Delete a contact by ID
export const deleteContactById = async (req, res) => {
    const { id } = req.params;

    try {
      // Attempt to find and delete the contact
      const deletedContact = await Contact.deleteContact(id)

      if (!deletedContact) {
        return res.status(404).json({
          message: "Contact not found",
        });
      }

      return res.status(200).json({
        message: "Contact deleted successfully",
        contact: deletedContact,
      });
    } catch (err) {
      console.error("Error deleting contact:", err);
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };


