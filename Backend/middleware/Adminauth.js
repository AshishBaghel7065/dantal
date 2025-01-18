import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({})
export const adminAuth = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1]; 
    
    if (!token) {
      return res.status(401).json({ message: "Admin Can Access the Dashboard" });
    }
    console.log(token)
    // Verify the token
    const secretKey = process.env.JWT_SECRET_KEY; 
    const decoded = jwt.verify(token, secretKey);
     
    const { adminId } = decoded.id;
    req.adminId = adminId;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
