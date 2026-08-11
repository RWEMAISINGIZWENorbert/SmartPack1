import salaryModel from "../models/salaryModel.js";
import employeeModel from "../models/employeeModel.js";
import departmentModel from "../models/detpartmentModel.js";

export const salaries = async (req, res) => {
    try {
        const salaries = await salaryModel.findAll({
            include: [
                { model: employeeModel },
                { model: departmentModel }
            ]
        });
        
        res.status(200).json({
            success: true,
            data: salaries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const newSalary = async (req, res) => {
    try {
        const { 
            employeeId, 
            departmentId, 
            grossSalary, 
            totalDeduction, 
            netSalary, 
            month 
        } = req.body;

        // 1. Validate required fields
        if (!employeeId || !departmentId || !grossSalary || !totalDeduction || !netSalary || !month) {
            return res.status(400).json({
                msg: "Please provide all required fields (employeeId, departmentId, grossSalary, totalDeduction, netSalary, month)",
                error: true
            });
        }

        // 2. Prepare payload
        const payload = {
            employeeId,
            departmentId,
            grossSalary,
            totalDeduction,
            netSalary,
            month
        };

        // 3. Create and save the salary record
        const result = await salaryModel.create(payload);

        res.status(201).json({
            success: true,
            msg: "Salary record created successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
};

export const updateSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const [updatedRows] = await salaryModel.update(updates, {
            where: { id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: "Salary record not found or no changes made",
            });
        }

        const updatedSalary = await salaryModel.findByPk(id);

        res.status(200).json({
            success: true,
            msg: "Salary record updated successfully",
            data: updatedSalary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const deleteSalary = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await salaryModel.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                success: false,
                msg: "Salary record not found",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Salary record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};