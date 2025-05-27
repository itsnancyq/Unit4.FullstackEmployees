import express from "express";
const router = express.Router();
export default router;

import { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from "#db/queries/employees";

router.route("/").get(async (req, res)=>{
   return res.status(200).send("Welcome to the Fullstack Employees API.");
});

router.route("/employees").get(async (req,res)=>{
    const employees = await getEmployees();
    return res.send(employees);
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
        return res.status(400).send({error: "Please send a valid ID."});
    };

    const employee = await getEmployee(id);
    if(!employee){
        return res.status(404).send({error: "Employee does not exist."});
    };

    res.send(employee);
});

router.route("/employees/:id").delete(async (req, res)=>{
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        res.status(400).send({error: "Please send a valid ID."});
    };

    const employee = await getEmployee(id);
    if(!employee){
      return res.status(404).send({error: "Employee not found"});
    };

    const deletes = await deleteEmployee(id);
    if(!deletes){
        res.status(404).send({error: "Employee does not exist."});
    };
    res.sendStatus(204);
});

router.route("/employees/:id").put(async (req, res)=>{
    const id = req.params.id;
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {name, birthday, salary} = req.body;
    if(!name || !birthday || !salary){
        return res.status(404).send({error: "Missing required fields."});
    };

    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send valid ID."});
    };

    const employee = await getEmployee(id);
    if(!employee){
        return res.status(404).send({errror: "Employee does not exist."});
    };

    const updated = await updateEmployee({id, name, birthday, salary});
    res.status(200).send(updated)

});