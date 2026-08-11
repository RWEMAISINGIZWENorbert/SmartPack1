import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Set to true to see SQL queries in console
    }
);

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Database connected successfully.");
        
        // Sync models (avoid destructive alterations by default)
        await sequelize.sync();
        console.log("Models synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};

export { sequelize };
export default dbConnect;