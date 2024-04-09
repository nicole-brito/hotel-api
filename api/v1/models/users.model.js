import sequelize from "sequelize";
import db from "../repositories/db.js"

export const CUSTOMER = "customer";
export const ADMIN = "admin";
export const ROLES = [CUSTOMER];

const User = db.define(
    "users",
    {
        userId: {
            type: sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: sequelize.STRING,
            allowNull: false,
            defaultValue: "NOT ISSUED",
        },
    },
        { underscored: true}
);

User.sync

export default User;