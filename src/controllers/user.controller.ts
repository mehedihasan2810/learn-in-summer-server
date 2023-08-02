import { Request, Response } from "express";
import Users from "../models/users.model";

export const addUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;

    if (!userInfo.email || !userInfo.name) {
      return;
    }

    const getUser = await Users.findOne({ email: userInfo.email });

    const ids: string[] = [];
    const getUsers = await Users.find();
    getUsers.reduce((acc, user) => {
      if (!acc.includes(user.email)) {
        acc.push(user.email);
        ids.push(user._id);
      }

      return acc;
    }, []);

    await Users.deleteMany({
      _id: { $nin: ids.map((id) => id) },
    });

    if (!getUser) {
      const result = new Users(userInfo);

      await result.save();

      res.status(201).json(result);
    } else {
      res.status(200).json({ message: "user exist" });
    }

    // res.status(200).json({ getUser });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const getUsers = await Users.find();

    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    if (!email) {
      res.status(401).json({ success: false });
      return;
    }
    const getUser = await Users.findOne({ email: email });
    if (!getUser) {
      res.status(401).json({ success: false });
    } else {
      res.status(200).json(getUser);
    }
  } catch (error) {
    res.status(500).send({ success: false, message: (error as Error).message });
  }
};
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const role = req.body.role;

    const result = await Users.findByIdAndUpdate(
      { _id: id },
      { role: role },
      { new: true, upsert: false, rawResult: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ success: false, message: (error as Error).message });
  }
};
