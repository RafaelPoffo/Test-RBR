const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: Date, required: true },
});

const Employee = models.Employee || model('Employee', EmployeeSchema);

module.exports = { Employee };
