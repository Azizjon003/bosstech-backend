import { Router } from "express";
import { createMessage } from "../controller/messages.controller.js";
import { messageValidation } from "../validation/message.validation.js";
import { handleValidationErrors } from "../middleware/handleValidationError.js";
const route = Router();
route.post("/message", messageValidation, handleValidationErrors, createMessage);
export default route;
