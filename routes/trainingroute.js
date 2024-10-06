const express=require('express')
const trainingController=require('../controller/trainingcontroller')
const router=express.Router()

router.post('/addTraining',trainingController.addTraining) //add trainings
router.get('/progressTrainingCount',trainingController.getProgressTrainingCount) 
router.get('/completedTrainingCount',trainingController.getCompletedTrainingCount)//get training count
router.get('/AllTrainersCount',trainingController.getAllTrainersCount) //get trainers count
router.get('/getAllTrainings',trainingController.getAllTrainings) //get all trainings
router.patch('/trainingprogress/:Training_id', trainingController.updateTrainingProgress)//update training progress
router.patch('/editTraining/:Training_id',trainingController.editTraining)
router.delete('/deleteTraining/:id',trainingController.deleteTraining)
module.exports=router