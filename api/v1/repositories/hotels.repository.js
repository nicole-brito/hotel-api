//O services passa para o repositório
import Hotel from "../models/hotels.model.js";

async function getHotels (){
    try {
        return await Hotel.findAll()
    } catch(err) {
        throw err;
    }
}

async function getHotel(id) {
    try {
        return await Hotel.findByPk(id);
    } catch(err) {
        throw err;
    }
}

async function createHotel(hotel) {
    try {
        return await Hotel.create(hotel);
    } catch(err) {
        throw err;
    }
}

async function deleteHotel(id) {
    try {
        await Hotel.destroy({
            where: {
                hotelId: id,
            },
        });
    } catch(err) {
        throw err;
    }
}

async function updateHotel(hotel) {
    try {
        await Hotel.update(hotel, {
            where: {
                hotelId: hotel.hotelId
            }
        })
    } catch(err) {
        throw err;
    }
}

export default {
    getHotels,
    getHotel,
    deleteHotel,
    updateHotel,
    createHotel,
}