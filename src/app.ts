import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import consumptionRoutes from "./routes/measures.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", consumptionRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

export default app;
