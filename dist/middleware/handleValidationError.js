import { validationResult } from "express-validator";
export function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ status: "error", message: errors.array()[0].msg });
    }
    next();
}
