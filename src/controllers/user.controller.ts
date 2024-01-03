import { Request, Response } from "express";
import Users from "../models/users.model";

// Endpoint: Add a user or update existing user information.
export const addUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;

    // Checking if required fields are present in the request body
    if (!userInfo.email || !userInfo.name) {
      return;
    }

    // Checking if a user with the same email already exists
    const getUser = await Users.findOne({ email: userInfo.email });

    // Retrieving unique user IDs and deleting users with non-unique IDs
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

    // Creating a new user if it does not exist, otherwise, responding with a message
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

// Endpoint: Get all users.
export const getUsers = async (_req: Request, res: Response) => {
  try {
    // Retrieving all users
    const getUsers = await Users.find();

    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

//  Endpoint: Get user details by email.
export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    // Checking if the email parameter is present in the request
    if (!email) {
      res.status(401).json({ success: false });
      return;
    }

    // Retrieving user details by email
    const getUser = await Users.findOne({ email: email });

    // Responding with the user details or an error message
    if (!getUser) {
      res.status(401).json({ success: false });
    } else {
      res.status(200).json(getUser);
    }
  } catch (error) {
    res.status(500).send({ success: false, message: (error as Error).message });
  }
};

//  Endpoint: Update user role by ID.
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const role = req.body.role;

    // Updating user role by ID
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
