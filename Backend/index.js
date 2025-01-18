import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/Db.js';
import Pageroutes from './routes/routes.js'
import cors from 'cors'
// Load environment variables
dotenv.config();



const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json())
app.use(cors())



app.use("/api", Pageroutes)

app.get("/", (req, res) => {
    res.status(200).json({
        message: `Server is Running on Port ${PORT}`,
        success: true
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


connectToDatabase();
