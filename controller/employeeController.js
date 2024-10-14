const Employees = require("../model/employee");

// Add Employee Controller
exports.addEmployee = async (req, res) => {
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
    console.error("Error adding employee:", error);
    res
      .status(400)
      .json({ message: "Failed to add employee", error: error.message });
  }
};

//get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find({}, "emp_id emp_name designation"); // Fetch emp_id and emp_name
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Controller to update an employee
exports.updateEmployee = async (req, res) => {
  const { emp_id } = req.params; 
  const { emp_name, designation } = req.body; 

  try {
   
    const updatedEmployee = await Employees.findOneAndUpdate(
      { emp_id },
      { emp_name, designation },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee" });
  }
};

// Controller to delete an employee
exports.deleteEmployee = async (req, res) => {
  const { emp_id } = req.params; 
  try {
    const deletedEmployee = await Employees.findOneAndDelete({ emp_id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee" });
  }
};
