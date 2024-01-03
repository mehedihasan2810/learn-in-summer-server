import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import config from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import "./configs/db";
import { userRouter } from "./routes/user.route";
import { classesRouter } from "./routes/classes.route";
import { selectedClassRouter } from "./routes/selectedClass.route";
import { paymentsRouter } from "./routes/payments.route";

// Creating an Express application instance
const app: Express = express();
const PORT: string | number = config.app.port;

// Applying middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT authentication route
app.post("/jwt", (req: Request, res: Response) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "2h",
  });

  res.status(200).json({ token });
});

// Registering routes
app.use(classesRouter);
app.use(userRouter);
app.use(selectedClassRouter);
app.use(paymentsRouter);

// Not found route error handling
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: "not found 404",
  });
});

// Server error handling
app.use((_err: Errback, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: "server error",
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
