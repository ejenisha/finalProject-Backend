const express=require('express')
const employeeController=require('../controller/employeeController')
const router=express.Router()

router.post('/addEmployee',employeeController.addEmployee)  //add employess
 //get employee count
router.get('/getAllEmployees',employeeController.getAllEmployees)  //get all employees
router.patch('/editEmployee/:emp_id', employeeController.updateEmployee);
router.delete('/deleteEmployee/:emp_id', employeeController.deleteEmployee);
module.exports=router