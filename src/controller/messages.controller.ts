import { Request, Response } from "express";
import Message from "../models/message";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    const msg = await Message.create({ name, email, phone, message });

    
    res.status(201).json({ message: "Message created", msg });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
