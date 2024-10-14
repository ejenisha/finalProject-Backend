const Access = require("../model/access"); // Import the Access model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Access.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Respond with user info and token
    res.status(200).json({
      message: "Login successful",
      role: user.role,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Trainer
exports.createTrainer = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new trainer
    const newTrainer = new Access({ email, password: hashedPassword, role });
    await newTrainer.save();

    res.status(201).json({ message: "Trainer created successfully" });
  } catch (error) {
    console.error("Error creating Trainer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
