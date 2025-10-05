import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// User route
app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
