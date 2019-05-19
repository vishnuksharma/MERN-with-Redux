const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  paymentMode: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
