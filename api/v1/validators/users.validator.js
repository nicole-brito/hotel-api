import { body, query } from "express-validator";
import { ROLES, ADMIN } from "../models/users.model";

const signupValidation = [
    body("firstName", "is required").exists().notEmpty(),
    body("lastName", "is required").exists().notEmpty(),
    body("email", "is required").exists().notEmpty().isEmail(),
    body("password", "is required").exists().notEmpty().isLength({min: 8}),
    body("phone", "is required").exists().notEmpty(),
]

const validate = (method) => {
    switch (method) {
        case "customer_signup": {
            return [
                ...signupValidation, 
                body("role", "is required")
                .exists()
                .notEmpty()
                .custom((value) => {
                if (!ROLES.includes(value) || value === ADMIN ) {
                    throw new Error("Invalid role option");
                }
            }),
            ];
        }
        case "admin_signup": {
            return [ ...signupValidation, 
                body("role", "Admin Role are required")
                .exists()
                .notEmpty()
                .custom((value) => {
                    if (value !== ADMIN) {
                        throw new Error('Invalid role option: $(value)');
                    }
                    return true;
                }),
            ];
        }
        case "login": {
            return [
                body("email", "is required").exists().notEmpty().isEmail(),
                body("password", "is required").exists().notEmpty().isLength({min: 8}),
            ]
        }
        case "refreshToken": {
            return [
                body("refreshToken", "is required").exists().notEmpty(),
            ];
        }
        case "revoke-refresh-token": {
            return [
                query("id", "is required").exists().notEmpty(),
            ];
        }
    }
};

export default { validate };