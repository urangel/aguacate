const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avocadoSchema = new Schema({
  date: String,
  average_price: Number,
  total_volume: Number,
  _4046: Number,
  _4225: Number,
  _4770: Number,
  total_bags: Number,
  small_bags: Number,
  large_bags: Number,
  xl_bags: Number,
  type: String,
  year: Number,
  region: String

});

const Avocado = mongoose.model("Avocado", avocadoSchema);

module.exports = Avocado;

