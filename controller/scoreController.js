// controllers/trainerController.js
const Scores = require('../model/scores');

// Controller to handle POST request for entering training score
exports.enterTrainingScore = async (req, res) => {
  const {
    emp_id,
    emp_name,
    Training_id,
    Training_name,
    Trainer_name,
    project_scores,
    comments,
    time,
    requirements,
    hackerrank
  } = req.body;

  try {
   
  
    const score = new Scores({
        emp_id: emp_id,
        emp_name:emp_name,
        Training_id: Training_id,
        Training_name:Training_name,
        Trainer_name: Trainer_name,
        project_scores,
        comments,
        time,
        requirements,
        hackerrank
    });

    await score.save(); // Save the score information

    // Respond with success message
    res.status(201).json({
      status: 'success',
      message: 'scores saved successfully',
      data: {
       
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


exports.getAllScores = async (req, res) => {
  try {
    // Fetch all scores from the Scores collection
    const scores = await Scores.find();

    // Check if any scores were found
    if (scores.length === 0) {
      return res.status(404).json({ message: 'No scores found' });
    }

    // Respond with the fetched scores
    return res.status(200).json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};
 exports.getemployeeTrainingCount=async(req,res)=>{
    try {
        const trainingCounts = await Scores.aggregate([
          {
            $group: {
              _id: '$Training_name',
              employeeCount: { $sum: 1 }
            }
          },
          {
            $project: {
              Training_name: '$_id',
              employeeCount: 1,
              _id: 0
            }
          }
        ]);
        res.json(trainingCounts);
      } catch (error) {
        console.error('Error fetching training counts:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
exports.projectscores=async(req,res)=>{
  try {
    const totalScores = await Scores.countDocuments();
    const range0to30 = await Scores.countDocuments({ project_scores: { $gte: 0, $lte: 30 } });
    const range31to50 = await Scores.countDocuments({ project_scores: { $gte: 31, $lte: 50 } });
    const range51to80 = await Scores.countDocuments({ project_scores: { $gte: 51, $lte: 80 } });
    const range81to100 = await Scores.countDocuments({ project_scores: { $gte: 81, $lte: 100 } })

    if (totalScores === 0) {
      return res.json({
        range0to30: 0,
        range31to50: 0,
        range51to80: 0,
        range81to100: 0,
      });
    }

    const percentage0to30 = (range0to30 / totalScores) * 100;
    const percentage31to50 = (range31to50 / totalScores) * 100;
    const percentage51to80 = (range51to80 / totalScores) * 100;
    const percentage81to100 = (range81to100 / totalScores) * 100;

    res.json({
      range0to30: percentage0to30,
      range31to50: percentage31to50,
      range51to80: percentage51to80,
      range81to100: percentage81to100,
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.avgscores=async(req,res)=>{
  try {
    const averageScores = await Scores.aggregate([
      {
        $group: {
          _id: '$Training_name', // Group by training name
          average_project_scores: { $avg: '$project_scores' }, // Calculate average project scores
          average_time: { $avg: '$time' }, // Calculate average time management score
          average_requirements: { $avg: '$requirements' }, // Calculate average understanding requirement score
          average_hackerrank: { $avg: '$hackerrank' }, // Calculate average Hackerrank score
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          Training_name: '$_id', // Rename _id to Training_name
          average_project_scores: 1,
          average_time: 1,
          average_requirements: 1,
          average_hackerrank: 1,
        },
      },
    ]);

    res.status(200).json(averageScores);
  } catch (error) {
    console.error('Error fetching average scores:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}