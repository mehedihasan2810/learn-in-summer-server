import { Request, Response } from "express";
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
