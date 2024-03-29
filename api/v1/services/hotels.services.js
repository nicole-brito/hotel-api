//Aqui é onde vai a lógica de negócios
import HotelsRepository from "../repositories/hotels.repository.js";

async function getHotels () {
    return await HotelsRepository.getHotels();
}

async function getHotel(id) {
    return await HotelsRepository.getHotel(id);
}

async function createHotel(hotel) {
    return await HotelsRepository.createHotel(hotel);
}

async function deleteHotel(id) {
    return await HotelsRepository.deleteHotel(id);
}

async function updateHotel(hotel) {
    return await HotelsRepository.updateHotel(hotel);
}

export default {
    getHotels,
    getHotel,
    deleteHotel,
    updateHotel,
    createHotel,
}