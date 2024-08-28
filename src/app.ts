import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import consumptionRoutes from "./routes/measures.routes";
import dataSource from "./database/data-source";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dataSource
  .initialize()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

// Here should be included the routes
app.use("/api", consumptionRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
