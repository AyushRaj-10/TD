import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.routes.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const corsOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
  : null;

app.use(
  corsOrigins?.length ? cors({ origin: corsOrigins }) : cors()
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/todos", todoRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
