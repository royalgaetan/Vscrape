import helmet from "helmet";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import "dotenv/config";
import connectToDatabase from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import catchAsync from "./utils/catchAsync";
import { HttpStatusCode } from "./constants/httpCodes";
import authRoutes from "./routes/auth.route";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/me.route";
import authenticate from "./middleware/authenticate.middleware";
import meRouter from "./routes/me.route";

const express: typeof import("express") = require("express");

// App init
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

// Routes
app.get(
  "/",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HttpStatusCode.OK).json({
      Status: "🟢 Healthy",
    });
  })
);

// Auth Routes
app.use("/auth", authRouter);

// Protected Routes (me)
app.use("/me", authenticate, meRouter);
// app.use("/worflows/:workflowId/executions/:execId/phases/:phaseId", authenticate, workflowRouter);

// Public Routes
// app.use("/templates/workflows/:id", templatesRouter);
// app.use("/users/:userId", userRouter);

// Error Handler (main)
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server successfully started on port: ${PORT}...`);
  console.log(
    `✅ Node Environment: <${NODE_ENV}> ${NODE_ENV == "prod" ? "⚡" : "🛡️"}`
  );

  await connectToDatabase();
});
