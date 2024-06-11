import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
const app: Application = express();

//PARSER
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developers!");
});

app.use(globalErrorHandler);

export default app;
