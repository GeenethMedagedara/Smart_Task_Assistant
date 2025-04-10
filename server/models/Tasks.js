const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  dueDate: Date,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  recurring: Boolean,
  completed: { type: Boolean, default: false }
});

const Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks;