const express=require('express')
const trainingController=require('../controller/trainingcontroller')
const router=express.Router()
router.post('/addTraining',trainingController.addTraining)
router.get('/AllTrainingcount',trainingController.getAllTrainingCount)
router.get('/AllTrainersCount',trainingController.getAllTrainersCount)
router.get('/getAllTrainings',trainingController.getAllTrainings)
module.exports=router