import employeeModel from "../models/employeeModel.js";

export const employees = async (req, res) => {
    try {
        const employees = await employeeModel.findAll();
        res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
};

export const newEmployee = async (req, res) => {
    try {
        const { 
            employeeNumber, 
            firstName, 
            lastName, 
            position, 
            address, 
            telephone, 
            gender 
        } = req.body;

        // 1. Validate required fields
        if (!employeeNumber || !firstName || !lastName || !position || !address || !telephone || !gender) {
            return res.status(400).json({
                msg: "Please provide all required fields",
                error: true
            });
        }

        // 2. Check if the employee Number already exists
        const isExist = await employeeModel.findOne({ where: { employeeNumber } });
        if (isExist) {
            return res.status(409).json({
                msg: `Employee with number ${employeeNumber} already exists`,
                error: true,
            });
        }

        // 3. Prepare payload and set hiredDate to now
        const payload = {
            employeeNumber,
            firstName,
            lastName,
            position,
            address,
            telephone,
            gender,
            hiredDate: new Date() // Sets to current datetime
        };

        // 4. Save to database
        const result = await employeeModel.create(payload);

        res.status(201).json({
            success: true,
            msg: "Employee created successfully",
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

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const [updatedRows] = await employeeModel.update(updates, {
            where: { id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found or no changes made",
            });
        }

        const updatedEmployee = await employeeModel.findByPk(id);

        res.status(200).json({
            success: true,
            msg: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            message: error.message
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await employeeModel.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
};

