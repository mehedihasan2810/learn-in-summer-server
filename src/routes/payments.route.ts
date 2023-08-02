import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT";
import { createPaymentIntent } from "../controllers/payments.controller";

const paymentsRouter = express.Router();

paymentsRouter.post("/create-payment-intent", verifyJWT, createPaymentIntent);

export { paymentsRouter };
