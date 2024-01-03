import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT";
import {
  createPaymentIntent,
  getEnrolledClasses,
  getPaymentDetails,
  payments,
} from "../controllers/payments.controller";

// Creating an Express Router instance
const paymentsRouter = express.Router();

// Defining routes and associating them with corresponding controller functions
paymentsRouter.post("/create-payment-intent", verifyJWT, createPaymentIntent);
paymentsRouter.post("/payments", verifyJWT, payments);
paymentsRouter.get("/getPaymentDetails", verifyJWT, getPaymentDetails);
paymentsRouter.get("/getEnrolledClasses", verifyJWT, getEnrolledClasses);

export { paymentsRouter };
