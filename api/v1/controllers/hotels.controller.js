//Trata a requisição aqui mas a lógica de negócios vai em outro lugar
import HotelsServices from "../services/hotels.services.js";

async function getHotels (req, res, next){
    try {
        const result = await HotelsServices.getHotels();
        console.log(result);
        res.send(result);
        //res.send(await HotelsServices.getHotels());
    } catch (err) {
        
    }
}

async function createHotel(req, res, next) {}

async function getHotel(req, res, next) {}

async function deleteHotel(req, res, next) {}

async function updateHotel(req, res, next) {}

export default {
    getHotels,
    getHotel,
    deleteHotel,
    updateHotel,
    createHotel
}