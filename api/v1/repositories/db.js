import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_DB_HOTELS_API, {
    dialect: "postgres",
    define: {
        timestamps: false,
    },
});

export default sequelize;
