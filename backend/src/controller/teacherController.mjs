import teacherModel from '../model/teacherModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

const teacherController = {
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user already exists
      const existingUser = await teacherModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists', data: username });
      }

      // Create new user
      const newUser = await teacherModel.create({ username, password });

      res.status(201).json({ message: 'User registered successfully', data: {username: newUser.username, id: newUser._id} });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find the user
      const user = await teacherModel.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const accessToken = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

      // Send token as HttpOnly cookie
      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'none',
          maxAge: 3600000 * 24, // 24 hours
        })
        .json({ message: 'Login successful', accessToken, data: {username: user.username, id: user._id} });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  checkAuth: async (req, res) => {
    try {
      // Ensure cookies are present
      const token = req.cookies?.accessToken;
      if (!token) {
        console.log("No token provided in cookies wala talga");
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Send response with user details (customize as needed)
      res.status(200).json({ message: 'Access granted', user: { id: decoded.id, username: decoded.username } });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
  },

  logout: (req, res) => {
    try {
      // Clear the accessToken cookie
      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'none',
        })
        .status(200)
        .json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
}

export default teacherController;