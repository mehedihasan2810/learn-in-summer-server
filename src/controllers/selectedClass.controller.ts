import { Request, Response } from "express";
import SelectedClass from "../models/selectedClass.model";
import Classes from "../models/classes.model";

// Endpoint: Add a class to the selected classes of a user.
export const addSelectedClass = async (req: Request, res: Response) => {
  try {
    const { email, id } = req.body;

    // Adding the selected class to the user's selectedClassIds array
    const result = await SelectedClass.findOneAndUpdate(
      { email },
      { $push: { selectedClassIds: id } },
      { new: true, upsert: true, rawResult: true }
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Endpoint: Get the selected class IDs for a user by email.
export const getSelectedClassIds = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    // Finding the selected class IDs for a user by email
    const result = await SelectedClass.findOne({ email: email });

    // Responding with an object containing the user's email and selectedClassIds
    if (!result) {
      res.status(200).json({
        email: email,
        selectedClassIds: [],
      });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Endpoint: Get the details of the selected classes for a user by email.
export const getSelectedClass = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    // Finding the selected class details for a user by email
    const selectedResult = await SelectedClass.findOne({
      email,
    });

    // Responding with an empty array if no selected classes found
    if (!selectedResult) {
      res.status(200).json([]);
      return;
    }

    // Mapping the selectedClassIds to an array of object IDs
    const objectId = selectedResult?.selectedClassIds.map((id: string) => id);

    // Finding classes based on the mapped object IDs
    const result = await Classes.find({
      _id: {
        $in: objectId,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Endpoint: Delete a selected class for a user by email and class ID.
export const deleteSelectedClass = async (req: Request, res: Response) => {
  try {
    const email = req.query?.email;
    const id = req.query?.id;

    // Deleting a selected class for a user by email and class ID
    const query = { email };
    const result = await SelectedClass.findOneAndUpdate(
      query,
      {
        $pull: { selectedClassIds: id },
      },
      { new: true, upsert: false, rawResult: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
