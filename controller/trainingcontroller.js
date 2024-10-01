const { get } = require('mongoose');
const Training = require('../model/training');

// Add Training Controller
const addTraining = async (req, res) => {
  const { Training_id, Training_name, Trainer_name } = req.body;

  try {
    const training = new Training({
      Training_id,
      Training_name,
      Trainer_name,
    });

    await training.save();
    res.status(201).json(training);
  } catch (error) {
    console.error('Error adding training:', error);
    res.status(400).json({ message: 'Failed to add training', error: error.message });
  }
};
const getAllTraining=async(req,res)=>{
    try {
        const count = await Training.countDocuments();
        res.json({ count });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching training count' });
      }
}

const getAllTrainers=async(req,res)=>{
    try {
        const uniqueTrainers = await Training.aggregate([
          {
            $group: {
              _id: "$Trainer_name", // Group by Trainer_name
              count: { $sum: 1 } // Count each occurrence of the Trainer_name
            }
          },
          {
            $count: "count" // Count the unique trainers
          }
        ]);
    
        // Check if uniqueTrainers is empty
        const totalTrainers = uniqueTrainers.length > 0 ? uniqueTrainers[0].count : 0;
    
        res.status(200).json({ count: totalTrainers }); // Send count in JSON
      } catch (error) {
        console.error('Error counting unique trainers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {
  addTraining,getAllTraining,getAllTrainers
};
