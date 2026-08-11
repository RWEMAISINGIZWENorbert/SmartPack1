import departmentModel from "./models/detpartmentModel.js";
import employeeModel from "./models/employeeModel.js";
import salaryModel from "./models/salaryModel.js";
import { sequelize } from "./config/connectDB.js";

const seedData = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database Synced");

        // 1. Create a System Administrator
        const [admin] = await employeeModel.findOrCreate({
            where: { employeeNumber: "ADMIN-001" },
            defaults: {
                firstName: "System",
                lastName: "Administrator",
                position: "General Manager",
                address: "Kigali, Rwanda",
                telephone: "+250780000000",
                gender: "Male",
                hiredDate: new Date()
            }
        });

        const data = [
            { code: "CW", name: "Car Wash", gross: 300000, deduction: 20000, empName: "Jean", empLast: "Kamanzi" },
            { code: "ST", name: "Stock", gross: 200000, deduction: 5000, empName: "Marie", empLast: "Uwase" },
            { code: "MC", name: "Mechanic", gross: 450000, deduction: 40000, empName: "Eric", empLast: "Mugisha" },
            { code: "ADMS", name: "Administration Staff", gross: 600000, deduction: 70000, empName: "Alice", empLast: "Iradukunda" }
        ];

        const currentMonth = new Date().toLocaleString('default', { month: 'long' });

        for (const item of data) {
            // Create Department
            const [dept] = await departmentModel.findOrCreate({
                where: { DepartementCode: item.code },
                defaults: {
                    DepartementCode: item.code,
                    DepartementName: item.name,
                    GrossSalary: item.gross,
                    employeeId: admin.id
                }
            });

            // Create a Representative Employee for this department
            const [emp] = await employeeModel.findOrCreate({
                where: { employeeNumber: `${item.code}-EMP-01` },
                defaults: {
                    firstName: item.empName,
                    lastName: item.empLast,
                    position: `${item.name} Specialist`,
                    address: "Kigali",
                    telephone: "+250700000000",
                    gender: "Other",
                    hiredDate: new Date()
                }
            });

            // Create Salary Record for this month
            await salaryModel.findOrCreate({
                where: { 
                    employeeId: emp.id,
                    month: currentMonth
                },
                defaults: {
                    employeeId: emp.id,
                    departmentId: dept.id,
                    grossSalary: item.gross,
                    totalDeduction: item.deduction,
                    netSalary: item.gross - item.deduction,
                    month: currentMonth
                }
            });

            console.log(`Seeded: ${item.name} with Employee ${item.empName}`);
        }

        console.log("Seeding Completed Successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Failed:", error);
        process.exit(1);
    }
};

seedData();
