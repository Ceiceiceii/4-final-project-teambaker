// let users = {
//     "1234": {id: "1234", username: "John Doe", password: "password123"},
//     "4567": {id: "4567", username: "Lesley Zhao", password: "lesleyzhao"}
//    }
import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import User from '../models/User.mjs';
// const User = require('../models/User');

// The commented part is "Login with email & password"
// const loginRouter = async (req, res) => {
//     console.log("Login route hit");
//     const { email, password } = req.body;
  
//     try {
//       // Find the user asynchronously
//       const user = await User.findOne({ email });
  
//       if (user) {
//         // Check if two passwords match
//         if (bcrypt.compareSync(password, user.password)) {
//             // Generate an access token
//             //const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
//             const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
//           res.status(200).json({ message: "Successfully logged in!", accessToken });
//         } else {
//           res.status(401).json({ message: "Incorrect Password." });
//         }
//       } else {
//         res.status(404).json({ message: "User not found." });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   };
// export default loginRouter;

// The following is "Login with Username and Password"
const loginRouter = async (req, res) => {
  console.log("Login route hit");
  const { username, password } = req.body; // Changed from email to username
  console.log(password)
  try {
    // Find the user asynchronously
    const user = await User.findOne({ username }).select('+password'); // Changed from email to username
    console.log(user.password)
    if (user) {
      // Check if two passwords match
      if (bcrypt.compareSync(password, user.password)) {
          // Generate an access token
          const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "2h" });
          res.status(200).json({ message: "Successfully logged in!", accessToken });
      } else {
          res.status(401).json({ message: "Incorrect Password." });
      }
    } else {
          res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
  }
};

export default loginRouter;
