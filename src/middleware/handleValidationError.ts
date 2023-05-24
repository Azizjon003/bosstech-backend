import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: "error", message: errors.array()[0].msg });
  }

  next();
}
