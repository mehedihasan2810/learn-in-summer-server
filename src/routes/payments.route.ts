import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT";
import {
  createPaymentIntent,
  getEnrolledClasses,
  getPaymentDetails,
  payments,
} from "../controllers/payments.controller";

const paymentsRouter = express.Router();

paymentsRouter.post("/create-payment-intent", verifyJWT, createPaymentIntent);
paymentsRouter.post("/payments", verifyJWT, payments);
paymentsRouter.get("/getPaymentDetails", verifyJWT, getPaymentDetails);
paymentsRouter.get("/getEnrolledClasses", verifyJWT, getEnrolledClasses);

export { paymentsRouter };
