const express=require('express')
const trainingController=require('../controller/trainingController')
const router=express.Router()
router.post('/addTraining',trainingController.addTraining)
router.get('/getTraining',trainingController.getAllTraining)
router.get('/AllTrainers',trainingController.getAllTrainers)
module.exports=router