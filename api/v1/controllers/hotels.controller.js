//Trata a requisição aqui mas a lógica de negócios vai em outro lugar

async function getHotels (req, res, next){
    res.send("Chegou no controller de GET de Hotels :)");
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