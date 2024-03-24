import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_DB_HOTELS_API,
 {
    dialect: "postgres",
    define: {
        timestamp: false,
    },
});

export default sequelize