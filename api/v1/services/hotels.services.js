//Aqui é onde vai a lógica de negócios
import HotelsRepository from "../repositories/hotels.repository.js";

async function getHotels () {
    return await HotelsRepository.getHotels();
}

async function createHotel() {}

async function getHotel() {}

async function deleteHotel() {}

async function updateHotel() {}

export default {
    getHotels,
    getHotel,
    deleteHotel,
    updateHotel,
    createHotel
}