import { Request, Response } from "express";
import Classes from "../models/classes.model";
export const allClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await Classes.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getClass = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const classOne = await Classes.findById(query);

    res.status(200).json(classOne);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const addClass = async (req: Request, res: Response) => {
  try {
    const classInfo = req.body;
    const newClass = new Classes(classInfo);

    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const info = req.body;

    const updatedClass = await Classes.findByIdAndUpdate(filter, info, {
      new: true,
      upsert: false,
      rawResult: true,
    });

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const deletedClass = await Classes.findByIdAndDelete(query);

    res.status(200).json(deletedClass);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getSingleClass = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const singleClass = await Classes.findOne({
      _id: id,
    });

    res.status(200).json(singleClass);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const updateApproveStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Classes.findByIdAndUpdate(
      { _id: id },
      { status: "approved" },
      { new: true, upsert: false, rawResult: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const updateDenyStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Classes.findByIdAndUpdate(
      { _id: id },
      { status: "denied" },
      { new: true, upsert: false, rawResult: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const feedback = req.body.message;
    const result = await Classes.findByIdAndUpdate(
      { _id: id },
      { feedback: feedback },
      { new: true, upsert: false, rawResult: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
export const getAInstructorClasses = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    const result = await Classes.find({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
