import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./route/user.route.js";
import { couponRouter } from "./route/coupon.route.js";

export const app = express();
dotenv.config();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', couponRouter);

const PORT = process.env.PORT;
export const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});