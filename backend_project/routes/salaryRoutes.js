import express from "express";
import { 
    salaries, 
    newSalary, 
    updateSalary, 
    deleteSalary 
} from "../controllers/salaryController.js";

const salaryRouter = express.Router();

salaryRouter.get("/", salaries);
salaryRouter.post("/", newSalary);
salaryRouter.put("/:id", updateSalary);
salaryRouter.delete("/:id", deleteSalary);

export default salaryRouter;
