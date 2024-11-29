const mongoose = require('mongoose');

const visitorPollingSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Visitor = mongoose.model('VisitorPolling', visitorPollingSchema);

module.exports = Visitor;