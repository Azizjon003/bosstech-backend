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
    emailOrPhone: {},
    message: {
        isString: {
            errorMessage: "Message should be a string",
        },
    },
});
