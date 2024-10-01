const Employees = require('../model/employee');

// Add Employee Controller
const addEmployee = async (req, res) => {
  const { emp_id, emp_name, designation } = req.body;

  try {
    const employee = new Employees({
      emp_id,
      emp_name,
      designation,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ message: 'Failed to add employee', error: error.message });
  }
};
const getAllEmployee=async(req,res)=>{
    try {
        const count = await Employees.countDocuments();
        res.json({ count });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching employee count' });
      }
}

module.exports = {
  addEmployee,getAllEmployee
};
