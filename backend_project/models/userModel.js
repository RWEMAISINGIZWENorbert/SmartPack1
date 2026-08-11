import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const userModel = sequelize.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default userModel;
