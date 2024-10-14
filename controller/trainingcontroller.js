const Training = require("../model/training");

// Add Training Controller
exports.addTraining = async (req, res) => {
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
    console.error("Error adding training:", error);
    res
      .status(400)
      .json({ message: "Failed to add training", error: error.message });
  }
};

//Get Training Count
exports.getProgressTrainingCount = async (req, res) => {
  try {
    const count = await Training.countDocuments({ progress: "In Progress" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching training count" });
  }
};

//get completed Training count
exports.getCompletedTrainingCount = async (req, res) => {
  try {
    const count = await Training.countDocuments({ progress: "Completed" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching training count" });
  }
};

// Get Trainers Count
exports.getAllTrainersCount = async (req, res) => {
  try {
    const uniqueTrainers = await Training.aggregate([
      {
        $group: {
          _id: "$Trainer_name", // Group by Trainer_name
          count: { $sum: 1 }, // Count each occurrence of the Trainer_name
        },
      },
      {
        $count: "count", // Count the unique trainers
      },
    ]);

    // Check if uniqueTrainers is empty
    const totalTrainers =
      uniqueTrainers.length > 0 ? uniqueTrainers[0].count : 0;

    res.status(200).json({ count: totalTrainers }); // Send count in JSON
  } catch (error) {
    console.error("Error counting unique trainers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get all Trainings
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find(
      {},
      "Training_id Training_name Trainer_name progress"
    );
    res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ message: "Error fetching trainings" });
  }
};

//Update the progress of Trainings
exports.updateTrainingProgress = async (req, res) => {
  const { Training_id } = req.params;
  const { progress } = req.body;

  try {
    const updatedTraining = await Training.findOneAndUpdate(
      { Training_id },
      { progress }, 
      { new: true } 
    );

    if (!updatedTraining) {
      return res.status(404).send({ message: "Training not found" });
    }

    console.log("Updated Training:", updatedTraining);

    res.status(200).send({ message: "Training progress updated successfully" });
  } catch (error) {
    console.error("Error updating training progress:", error);
    res.status(500).send({ message: "Error updating training progress" });
  }
};

//edit training
exports.editTraining = async (req, res) => {
  const { Training_id } = req.params; 
  const { Training_name, Trainer_name } = req.body; 

  // Create an object to hold updates
  const updates = {};

  // Only add fields to updates object if they are provided
  if (Training_name) {
    updates.Training_name = Training_name;
  }
  if (Trainer_name) {
    updates.Trainer_name = Trainer_name;
  }

  // Check if there are no updates provided
  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update." });
  }

  try {
    // Find the training by Training_id and update the fields
    const updatedTraining = await Training.findOneAndUpdate(
      { Training_id },
      updates,
      { new: true } 
    );

    if (!updatedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }

    return res.status(200).json(updatedTraining);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete a training by ID
exports.deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
   
    const deletedTraining = await Training.findOneAndDelete({
      Training_id: id,
    });

    if (!deletedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }

    res
      .status(200)
      .json({ message: "Training deleted successfully", deletedTraining });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting training", error: error.message });
  }
};
