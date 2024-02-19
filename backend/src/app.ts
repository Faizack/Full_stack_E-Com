import express from "express";

import { errorMiddleware } from "./middlewares/error.js";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const app = express();
const port = 5000;
const host = "127.0.0.1";

app.use(express.json());

// Use Router for API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use(errorMiddleware)
app.listen(port, host, async () => {
  await connectDB();
  console.log(`Server is running on http://${host}:${port}`);
});