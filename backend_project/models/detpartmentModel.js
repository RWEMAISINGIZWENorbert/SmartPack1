import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";
import employeeModel from "./employeeModel.js";

const departmentModel = sequelize.define("department", {
    DepartementCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    DepartementName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GrossSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default departmentModel;
