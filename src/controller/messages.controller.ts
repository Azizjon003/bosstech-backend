import { Request, Response } from "express";
import Message from "../models/message.js";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json({ message: "Message created", msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
