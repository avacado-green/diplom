const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  startDate:   { type: Date, default: Date.now },
  deadline:    { type: Date },
  status:      { type: String, default: 'active' },
  manager:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', projectSchema);
