import departmentModel from "../models/detpartmentModel.js";
import employeeModel from "../models/employeeModel.js";

export const departments = async (req, res) => {
    try {
        const departments = await departmentModel.findAll();
        
        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const newDepartment = async (req, res) => {
    try {
        const { DepartementCode, DepartementName, GrossSalary } = req.body;

        // 1. Validate required fields
        if (!DepartementCode || !DepartementName || !GrossSalary) {
            return res.status(400).json({
                msg: "Please provide all required fields (DepartementCode, DepartementName, GrossSalary)",
                error: true
            });
        }

        // 2. Check if a department with that code already exists
        const isExist = await departmentModel.findOne({ where: { DepartementCode } });
        if (isExist) {
            return res.status(409).json({
                msg: `Department with code ${DepartementCode} already exists`,
                error: true,
                });
        }

        // 3. Prepare payload
        const payload = {
            DepartementCode,
            DepartementName,
            GrossSalary
        };

        // 4. Create and save the department
        const result = await departmentModel.create(payload);

        res.status(201).json({
            success: true,
            msg: "Department created successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const [updatedRows] = await departmentModel.update(updates, {
            where: { id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: "Department not found or no changes made",
            });
        }

        const updatedDepartment = await departmentModel.findByPk(id);

        res.status(200).json({
            success: true,
            msg: "Department updated successfully",
            data: updatedDepartment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await departmentModel.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                success: false,
                msg: "Department not found",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Department deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};
