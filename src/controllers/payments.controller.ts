import { Request, Response } from "express";
import PaymentsModel from "../models/payments.model";
import SelectedClassModel from "../models/selectedClass.model";
import ClassesModel from "../models/classes.model";
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

export const payments = async (req: Request, res: Response) => {
  try {
    const paymentInfo = req.body;
    const result = new PaymentsModel(paymentInfo);

    await result.save();

    await SelectedClassModel.findOneAndUpdate(
      { email: paymentInfo.student_email },
      { $pull: { selectedClassIds: paymentInfo.classId } }
    );
    await ClassesModel.findByIdAndUpdate(
      { _id: paymentInfo.classId },
      { $inc: { enrolled: 1, available_seats: -1 } }
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    const result = await PaymentsModel.find({
      student_email: email,
    }).sort({ date: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getEnrolledClasses = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const paymentedItems = await PaymentsModel.find({
      student_email: email,
    });
    const enrolledClasses = await ClassesModel.find({
      _id: {
        $in: paymentedItems.map((item) => item.classId),
      },
    });
    res.status(200).json(enrolledClasses);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
