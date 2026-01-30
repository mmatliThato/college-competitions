const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: 'Upcoming' }
}, { timestamps: true });

// We map 'id' to '_id' for Angular compatibility if needed
competitionSchema.virtual('competitionId').get(function() {
    return this._id.toHexString();
});
competitionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Competition', competitionSchema);