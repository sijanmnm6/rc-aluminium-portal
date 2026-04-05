const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  workDays: Number,
  basicSalary: Number,
  overtimePay: Number,
  advances: Number,
  loans: Number,
  deductions: {
    epf: Number,
    etf: Number,
    tax: Number,
    other: Number
  },
  grossSalary: Number,
  netSalary: Number,
  status: {
    type: String,
    enum: ['draft', 'approved', 'paid'],
    default: 'draft'
  },
  paidDate: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: mongoose.Schema.Types.ObjectId
});

payrollSchema.index({ staffId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Payroll', payrollSchema);