
const Scores = require('../model/scores');
const Employees=require('../model/employee')

// enter training score
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
  try 
  {
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
  res.status(201).json({
    status: 'success',
    message: 'scores saved successfully',
    data: {
       score
     }
   });
 } 
catch (error) {
  res.status(500).json({
    status: 'fail',
    message: 'An error occurred',
    error: error.message
   });
 }
};

//get Scores
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

//Get employee count group by Training
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

//
// exports.projectscores=async(req,res)=>{
//   try {
//     const totalScores = await Scores.countDocuments();
//     const range0to30 = await Scores.countDocuments({ project_scores: { $gte: 0, $lte: 30 } });
//     const range31to50 = await Scores.countDocuments({ project_scores: { $gte: 31, $lte: 50 } });
//     const range51to80 = await Scores.countDocuments({ project_scores: { $gte: 51, $lte: 80 } });
//     const range81to100 = await Scores.countDocuments({ project_scores: { $gte: 81, $lte: 100 } })

//     if (totalScores === 0) {
//       return res.json({
//         range0to30: 0,
//         range31to50: 0,
//         range51to80: 0,
//         range81to100: 0,
//       });
//     }

//     const percentage0to30 = (range0to30 / totalScores) * 100;
//     const percentage31to50 = (range31to50 / totalScores) * 100;
//     const percentage51to80 = (range51to80 / totalScores) * 100;
//     const percentage81to100 = (range81to100 / totalScores) * 100;

//     res.json({
//       range0to30: percentage0to30,
//       range31to50: percentage31to50,
//       range51to80: percentage51to80,
//       range81to100: percentage81to100,
//     });
//   } catch (error) {
//     console.error('Error fetching scores:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

//Get total avg scores by training
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

//Get individual employee report
exports. getEmployeeReport = async (req, res) => {
  const { emp_id, emp_name } = req.query;

  try {
    // Fetch employee details
    const employee = await Employees.findOne({ emp_id, emp_name });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Fetch the training scores based on employee ID
    const scores = await Scores.find({ emp_id });

    if (scores.length === 0) {
      return res.status(404).json({ message: 'No training records found for this employee' });
    }

    // Send employee details and their relevant training scores
    const response = {
      emp_id: employee.emp_id,
      emp_name: employee.emp_name,
      designation: employee.designation,
      trainings: scores.map((score) => ({
        Training_id: score.Training_id,
        Training_name: score.Training_name,
        Trainer_name: score.Trainer_name,
        project_scores: score.project_scores,
        requirements: score.requirements,
        time: score.time,
        hackerrank: score.hackerrank,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching employee report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Get top project score and the employee name for each training
exports.getTopScoresByTraining = async (req, res) => {
  try {
    const topScores = await Scores.aggregate([
      {
        // Group by Training_id and get the maximum project score for each group
        $group: {
          _id: {
            Training_id: "$Training_id",
            Training_name: "$Training_name"
          },
          maxScore: { $max: "$project_scores" }
        }
      },
      {
        // Join back with the Scores collection to get employee names for max scores
        $lookup: {
          from: "scores", // The name of the Scores collection
          let: { trainingId: "$_id.Training_id", maxScore: "$maxScore" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$Training_id", "$$trainingId"] },
                    { $eq: ["$project_scores", "$$maxScore"] }
                  ]
                }
              }
            },
            {
              // Project the fields we want to return
              $project: {
                emp_name: 1,
                project_scores: 1
              }
            }
          ],
          as: "topScorers"
        }
      },
      {
        // Unwind the topScorers array to flatten the results
        $unwind: "$topScorers"
      },
      {
        // Project the final output
        $project: {
          _id: 0,
          Training_id: "$_id.Training_id",
          Training_name: "$_id.Training_name",
          emp_name: "$topScorers.emp_name",
          project_scores: "$topScorers.project_scores"
        }
      }
    ]);

    // Send the result as a JSON response
    res.status(200).json({
      success: true,
      data: topScores
    });
  } catch (error) {
    console.error("Error fetching top scores by training:", error);
    // Send an error response in JSON format
    res.status(500).json({
      success: false,
      message: "Error fetching top scores by training",
      error: error.message
    });
  }
};