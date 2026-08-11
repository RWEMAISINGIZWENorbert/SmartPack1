import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import departmentRouter from "./routes/departmentRoutes.js";
import salaryRouter from "./routes/salaryRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("SmartPark EPMS API");
});

app.use("/auth", userRouter);
app.use("/employee", employeeRouter);
app.use("/department", departmentRouter);
app.use("/salary", salaryRouter);

const PORT = process.env.PORT;

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});