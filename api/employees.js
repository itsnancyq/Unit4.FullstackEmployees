import express from "express";
const router = express.Router();
export default router;

import { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

router.route("/").get(async (req, res)=>{
    res.send("Welcome to the Fullstack Employees API.");
});

router.route("/employees").get(async (req,res)=>{
    const employees = await getEmployees();
    res.send(employees);
});

router.route("/employees").post(async (req, res)=>{
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {name, birthday, salary} =  req.body
    if(!name || !birthday || !salary){
        return res.status(400).send({error: "Missing required params."});
    };

    const employee = await createEmployee({name, birthday, salary});
    res.status(201).send(employee);
});

router.route("/employees/:id").get(async (req, res)=>{
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send a valid number."});
    };

    const employee = await getEmployee(id);
    if(!employee){
        return res.status(404).send({error: "Employee does not exist."});
    };

    res.send(employee);
});

router.route("/employee/:id").delete(async (req, res)=>{
    
})