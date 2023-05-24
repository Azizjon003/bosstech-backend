import { checkSchema } from "express-validator";

export const messageValidation = checkSchema({
  name: {
    isLength: {
      errorMessage: "Name should be at least 3 chars long",
    },
    isString: {
      errorMessage: "Name should be a string",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    isString: {
      errorMessage: "Email should be a string",
    },
  },
  phone: {
    in: ["body"],
    matches: {
      options: /^\+998[0-9]{9}$/,
      errorMessage: "Noto'g'ri telefon formati",
    },
  },
  message: {
    isString: {
      errorMessage: "Message should be a string",
    },
  },
});
