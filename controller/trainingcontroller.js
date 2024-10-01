// controllers/trainerController.js
const Training = require('../model/training');
const Scores = require('../model/scores');

// Controller to handle POST request for entering training score
exports.enterTrainingScore = async (req, res) => {
  const {
    emp_id,
    emp_name,
    Training_id,
    Training_name,
    Trainer_name,
    scores,
    comments,
    coding,
    requirements,
    documentation
  } = req.body;

  try {
    // Step 1: Check if the training entry exists, if not create one
    let training = await Training.findOne({ e_id: emp_id, T_id: Training_id });

    if (!training) {
      training = new Training({
        emp_id: emp_id,
        emp_name: emp_name,
        Training_id: Training_id,
        Training_name: Training_name,
        Trainer_name: Trainer_name
      });

      await training.save(); // Save the training information if not exists
    }

    // Step 2: Save the scores in the Scores collection
    const score = new Scores({
        emp_id: emp_id,
        Training_id: Training_id,
        Trainer_name: Trainer_name,
        scores,
        comments,
        coding,
        requirements,
        documentation
    });

    await score.save(); // Save the score information

    // Respond with success message
    res.status(201).json({
      status: 'success',
      message: 'Training and scores saved successfully',
      data: {
        training,
        score
      }
    });
  } catch (error) {
    // Respond with an error message
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
      error: error.message
    });
  }
};
