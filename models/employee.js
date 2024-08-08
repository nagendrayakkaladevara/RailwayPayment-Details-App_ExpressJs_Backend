const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  yearOfJoining: Number,
  paymentHistory: [{
    yearOfPayment: Number,
    status: String,
    amount: Number,
    updatedAt: Date,
  }],
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
