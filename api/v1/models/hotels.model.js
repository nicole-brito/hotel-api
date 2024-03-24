import Sequelize from "sequelize";
import db from "../repositories/db.js";

//Antes: Configurar o banco de dados para definir o modelo
//O model é o obj que faz o link com o banco de dados

const Hotel = db.define(
    "hotels",
    {
        hotelId: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, 
    { underscored: true } //trata o _ pq aqui se usa camelCase
);

export default Hotel;