import AdminService from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password is Missing",
    });
  }

  try {
    // Fetch the admin by email
    const ExistAdmin = await AdminService.getAdminByEmail(email);

    if (!ExistAdmin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    // Check if the password matches (use bcrypt in real applications)
    const isPasswordValid = password === ExistAdmin.password; // Simplified for demonstration

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    console.log(ExistAdmin.id)
    const token = jwt.sign(
      { id: ExistAdmin.id, email: ExistAdmin.email }, // Include both id and email
      process.env.JWT_SECRET_KEY, // Secret key (ensure it's secure in .env file)
      { expiresIn: "7d" } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: "Login Successful",
      token, // Return the token to the client
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
