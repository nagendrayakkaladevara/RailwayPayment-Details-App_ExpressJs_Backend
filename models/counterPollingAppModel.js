const mongoose = require('mongoose');

const visitorPollingSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const VisitorPolling = mongoose.model('VisitorPolling', visitorPollingSchema);

module.exports = VisitorPolling;