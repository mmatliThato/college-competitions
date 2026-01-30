const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    // Link to the specific Competition (Essential for the sidebar context)
    competitionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Competition', 
        required: true 
    },
    // Link to the specific User (More secure and professional than using email)
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