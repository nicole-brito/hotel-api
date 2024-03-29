//Trata a requisição aqui mas a lógica de negócios vai em outro lugar
//import hotelsRepository from "../repositories/hotels.repository.js";
import HotelsServices from "../services/hotels.services.js";
import { validationResult } from "express-validator";

async function getHotels (req, res, next){
    try {
        const result = await HotelsServices.getHotels();
        console.log(result);
        res.status(200);
        res.send(result);
        //res.send(await HotelsServices.getHotels());
    } catch (err) {
        next(err);
    }
}

async function getHotel(req, res, next) {
    try {
        const hotel = await HotelsServices.getHotel(req.params.id);
        res.status(200);
        res.send(hotel);
    } catch (err) {
        next(err);
    }
}

async function createHotel(req, res, next) {
    try {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            const error = new Error(
                "Missing fields or invalid data" + 
                "Error Details: " +
                JSON.stringify(validationErrors.array(), null, 2)
            );
            error.statusCode = 400;
            throw error;
        }
        let hotel = req.body;
        hotel = await HotelsServices.createHotel(hotel);
        res.status(201).send(hotel);
    } catch (err) {
        next(err);
    }
}

async function deleteHotel(req, res, next) {
    try {
        await HotelsServices.deleteHotel(req.params.id);
        res.status(204).end();
        logger.info(`DELETE /hotels/:id`);

    } catch (err) {
        next(err);
    }
}

async function updateHotel(req, res, next) {
    try {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            const error = new Error(
                "Missing fields or invalid data" + 
                "Error Details: " +
                JSON.stringify(validationErrors.array(), null, 2)
            );
            error.statusCode = 400;
            throw error;
        }
        let hotel = req.body;
        hotel.hotelId = req.params.id;
        hotel = await HotelsServices.createHotel(hotel);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

export default {
    getHotels,
    getHotel,
    deleteHotel,
    updateHotel,
    createHotel
}