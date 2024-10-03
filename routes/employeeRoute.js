const express=require('express')
const employeeController=require('../controller/employeeController')
const router=express.Router()
router.post('/addEmployee',employeeController.addEmployee)
router.get('/getEmployeeCount',employeeController.getAllEmployeeCount)
router.get('/getAllEmployees',employeeController.getAllEmployees)
module.exports=router