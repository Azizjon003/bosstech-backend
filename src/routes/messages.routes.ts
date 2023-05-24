import { Router } from "express";
import { createMessage } from "../controller/messages.controller";
import { messageValidation } from "../validation/message.validation";
import { handleValidationErrors } from "../middleware/handleValidationError";

const route = Router();

route.post(
  "/message",
  messageValidation,
  handleValidationErrors,
  createMessage
);

export default route;
