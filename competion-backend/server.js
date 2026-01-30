require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Import Models
const User = require('./models/User');
const Competition = require('./models/Competition');
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION (ATLAS) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to TechNova Cloud (Atlas) ☁️'))
  .catch(err => console.error('Atlas Connection Error:', err));

// --- AUTHENTICATION ROUTES ---

app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ result: true, message: "User Registered" });
  } catch (err) {
    res.status(400).json({ result: false, message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (user) {
      // Create a Token for secure session management
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ result: true, data: user, token: token });
    } else {
      res.status(401).json({ result: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});

// --- COMPETITION ROUTES ---

app.get('/api/getCompetitions', async (req, res) => {
  const data = await Competition.find().sort({ endDate: 1 });
  res.json({ result: true, data: data });
});

app.get('/api/getCompetitionById/:id', async (req, res) => {
  try {
    const data = await Competition.findById(req.params.id);
    res.json({ result: true, data: data });
  } catch (err) {
    res.status(404).json({ result: false, message: "Competition not found" });
  }
});

// --- PROJECT SUBMISSION (STUDENT) ---

app.post('/api/project', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ result: true, message: "Project Archived Successfully" });
  } catch (err) {
    res.status(400).json({ result: false, message: err.message });
  }
});

app.get('/api/getUserSubmissions/:userId', async (req, res) => {
  try {
    const data = await Project.find({ userId: req.params.userId })
      .populate('competitionId', 'title')
      .sort({ createdAt: -1 });
    res.json({ result: true, data: data });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});

// --- COLLEGE ADMIN ROUTES ---

// Get participants for a specific competition
app.get('/api/getParticipants/:compId', async (req, res) => {
  try {
    const data = await Project.find({ competitionId: req.params.compId })
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    res.json({ result: true, data: data });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});

// Set the Competition Winner
app.post('/api/setWinner', async (req, res) => {
  try {
    const { projectId, competitionId } = req.body;
    await Project.updateMany({ competitionId }, { isWinner: false });
    await Project.findByIdAndUpdate(projectId, { isWinner: true });
    res.json({ result: true, message: "Winner Announced!" });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});



// --- DASHBOARD STATS (COLLEGE ROLE) ---
app.get('/api/college-stats', async (req, res) => {
  try {
    const totalParticipants = await User.countDocuments({ role: 'Student' });
    const pendingReview = await Project.countDocuments({ isWinner: false });
    const totalCompetitions = await Competition.countDocuments();
    
    res.json({ 
      result: true, 
      data: { totalParticipants, pendingReview, totalCompetitions } 
    });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});

// --- RECENT WINNERS (HOME PAGE) ---
app.get('/api/recent-winners', async (req, res) => {
  try {
    const winners = await Project.find({ isWinner: true })
      .populate('userId', 'fullName')
      .populate('competitionId', 'title')
      .sort({ updatedAt: -1 })
      .limit(5); // Show top 5 recent winners
    res.json({ result: true, data: winners });
  } catch (err) {
    res.status(500).json({ result: false, message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`TechNova Backend active on Port ${PORT}`);
});