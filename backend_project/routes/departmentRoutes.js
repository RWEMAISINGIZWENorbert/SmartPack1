import express from "express";
import { 
    departments, 
    newDepartment, 
    updateDepartment, 
    deleteDepartment 
} from "../controllers/departmentController.js";

const departmentRouter = express.Router();


departmentRouter.get("/", departments);
departmentRouter.post("/", newDepartment);
departmentRouter.put("/:id", updateDepartment);
departmentRouter.delete("/:id", deleteDepartment);

export default departmentRouter;
