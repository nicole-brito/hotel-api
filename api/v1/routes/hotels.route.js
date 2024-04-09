import express from "express";
import HotelsController from "../controllers/hotels.controller.js";
import hotelsValidator from "../validators/hotels.validator.js";
import pagination from "../../middlewares/pagination-sorting.js"
import { CUSTOMER } from "../models/users.model.js";
import { verifyToken, verifyAuthorization, } from "../../middlewares/auth.middleware.js"


const router = express.Router();

//O :id serve para passar um hotel especifico
router.get(
    "/", 
    verifyToken,
    verifyAuthorization(CUSTOMER),
    pagination(), 
    HotelsController.getHotels
    );

router.get("/:id", HotelsController.getHotel);

router.post(
    "/",
    hotelsValidator.validate("createHotel"),
    HotelsController.createHotel);

router.delete("/:id", HotelsController.deleteHotel);

router.put("/:id", HotelsController.updateHotel);

export default router;
