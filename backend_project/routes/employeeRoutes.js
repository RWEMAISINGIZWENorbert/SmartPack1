import express from "express";
import { 
    employees, 
    newEmployee, 
    updateEmployee, 
    deleteEmployee 
} from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.get("/", employees);
employeeRouter.post("/", newEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
