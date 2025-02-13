import helmet from "helmet";

const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

// App init
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use((req: any, res: any, next: any) => {
  console.log("Hi from Middleware 👋");
  next();
});

// Routes
app.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "Zscrape API currently under construction... ⚙️✍️",
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
