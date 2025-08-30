import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors()); // allow frontend calls (adjust origin later)
app.use(express.json());

app.get("/", (req, res) => res.send("Notes API — server is up ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
