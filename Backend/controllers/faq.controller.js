import FAQService from "../models/faq.model.js";

// Create a new FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer, answerWrittenBy } = req.body;

    if (!question || !answer || !answerWrittenBy) {
      return res.status(400).json({
        message: "Question, answer, and answerWrittenBy are required",
        success: false,
      });
    }

    const existingQuestion = await FAQService.findByQuestion(question);
    if (existingQuestion) {
      return res.status(400).json({
        message: "FAQ with this question already exists",
        success: false,
      });
    }

    const newQuestion = await FAQService.create(question, answer, answerWrittenBy);
    const getQuestion = await FAQService.findById(newQuestion.insertId);

    if (!getQuestion) {
      return res.status(404).json({
        message: "Failed to retrieve the newly created FAQ",
        success: false,
      });
    }

    return res.status(201).json({
      message: "FAQ created successfully",
      success: true,
      faq: getQuestion,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get all FAQs
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await FAQService.getAll();
    return res.status(200).json({
      message: "FAQs retrieved successfully",
      success: true,
      faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get FAQ by ID
export const getFaqById = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQService.findById(id);
    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "FAQ retrieved successfully",
      success: true,
      faq,
    });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update FAQ
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, answerWrittenBy } = req.body;

    // Ensure at least one field is provided for the update
    if (!question && !answer && !answerWrittenBy) {
      return res.status(400).json({
        message: "At least one field (question, answer, or answerWrittenBy) is required to update",
        success: false,
      });
    }

    // // Check if a new question is provided and already exists
    // if (question) {
    //   const existingFaq = await FAQService.findByQuestion(question);
    //   if (existingFaq && existingFaq.id !== id) {
    //     return res.status(400).json({
    //       message: "FAQ with the provided question already exists. Please choose a different title.",
    //       success: false,
    //     });
    //   }
    // }

    // Call the update service with only provided fields
    const updatedFaq = await FAQService.updateById(id, question, answer, answerWrittenBy);

    return res.status(200).json({
      message: "FAQ updated successfully",
      success: true,
      faq: updatedFaq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    if (error.message === "FAQ not found") {
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


// Delete FAQ
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    await FAQService.deleteById(id);
    return res.status(200).json({
      message: "FAQ deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    if (error.message === "FAQ not found") {
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
