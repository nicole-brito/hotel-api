import { body } from "express-validator";

const validate = (method) =>{
    switch (method) {
        case "createHotel":
            {
                return [
                    body("name", "name is required").exists().notEmpty(),
                    body("address", "name is required").exists().notEmpty(),
                    body("phone", "name is required").exists().notEmpty(),
                    body("rating", "name is required").exists().notEmpty().isNumeric(),
                ];
            }

            break;
    
        default:
            break;
    }
}

export default { validate };