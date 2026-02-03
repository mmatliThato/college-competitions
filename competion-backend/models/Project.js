const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    competitionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Competition', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    projectName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    githubUrl: { 
        type: String,
        required: true 
    },
    techStack: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Project', projectSchema);