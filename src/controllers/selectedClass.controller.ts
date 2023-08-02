import { Request, Response } from "express";
import SelectedClass from "../models/selectedClass.model";
import Classes from "../models/classes.model";

export const addSelectedClass = async (req: Request, res: Response) => {
  try {
    const { email, id } = req.body;

    const result = await SelectedClass.updateOne(
      { email },
      { $push: { selectedClassIds: id } },
      { upsert: true }
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getSelectedClassIds = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await SelectedClass.findOne({ email: email });
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

export const getSelectedClass = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const selectedResult = await SelectedClass.findOne({
      email,
    });

    if (!selectedResult) {
      res.status(200).json([]);
      return;
    }

    const objectId = selectedResult?.selectedClassIds.map((id: string) => id);
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

export const deleteSelectedClass = async (req: Request, res: Response) => {
  try {
    const email = req.query?.email;
    const id = req.query?.id;
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

