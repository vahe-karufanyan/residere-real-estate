const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  agent: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["apartment", "house"],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  squareMeters: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
    min: 1,
  },
  active: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {timeseries: true})

module.exports = mongoose.model("Property", PropertySchema)