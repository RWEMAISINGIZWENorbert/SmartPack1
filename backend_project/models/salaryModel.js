import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";
import employeeModel from "./employeeModel.js";
import departmentModel from "./detpartmentModel.js";

const salaryModel = sequelize.define("salary", {
    grossSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalDeduction: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    netSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Define Associations
salaryModel.belongsTo(employeeModel, { foreignKey: 'employeeId' });
employeeModel.hasMany(salaryModel, { foreignKey: 'employeeId' });

salaryModel.belongsTo(departmentModel, { foreignKey: 'departmentId' });
departmentModel.hasMany(salaryModel, { foreignKey: 'departmentId' });

export default salaryModel;
