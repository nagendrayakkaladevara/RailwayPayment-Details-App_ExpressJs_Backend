const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const VisitorPolling = mongoose.model('Visitor', visitorSchema);

module.exports = VisitorPolling;