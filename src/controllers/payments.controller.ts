import { Request, Response } from "express";
import PaymentsModel from "../models/payments.model";
import SelectedClassModel from "../models/selectedClass.model";
import ClassesModel from "../models/classes.model";
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

//  Endpoint: Create a payment intent for a given price.
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    // Creating a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Responding with the client secret for the created payment intent
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

//  Endpoint: Process a payment and update related data.
export const payments = async (req: Request, res: Response) => {
  try {
    const paymentInfo = req.body;

    // Saving payment details to the PaymentsModel
    const result = new PaymentsModel(paymentInfo);

    await result.save();

    // Removing the selected class from the student's list
    await SelectedClassModel.findOneAndUpdate(
      { email: paymentInfo.student_email },
      { $pull: { selectedClassIds: paymentInfo.classId } }
    );

    // Updating class information (incrementing enrollment and decrementing available seats)
    await ClassesModel.findByIdAndUpdate(
      { _id: paymentInfo.classId },
      { $inc: { enrolled: 1, available_seats: -1 } }
    );

    // Responding with the result of the payment processing
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Endpoint: Get payment details for a specific student by email.
export const getPaymentDetails = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    // Retrieving payment details for a specific student and sorting by date in descending order
    const result = await PaymentsModel.find({
      student_email: email,
    }).sort({ date: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Endpoint: Get enrolled classes for a specific student by email.
export const getEnrolledClasses = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    // Retrieving paymented items for a specific student
    const paymentedItems = await PaymentsModel.find({
      student_email: email,
    });

    // Retrieving enrolled classes based on the paymented items
    const enrolledClasses = await ClassesModel.find({
      _id: {
        $in: paymentedItems.map((item) => item.classId),
      },
    });

    // Responding with the enrolled classes
    res.status(200).json(enrolledClasses);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
