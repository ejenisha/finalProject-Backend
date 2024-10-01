const express=require('express')
const employeeController=require('../controller/employeeController')
const router=express.Router()
router.post('/addEmployee',employeeController.addEmployee)
router.get('/getEmployees',employeeController.getAllEmployee)
module.exports=router