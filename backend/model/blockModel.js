const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
  room: { type: String, required: true },
  state: String,
  issue: String,
});

const floorSchema = new mongoose.Schema({
  block: String,
  rooms: [roomSchema],
});

const BlockSchema = new mongoose.Schema({
  block: String,
  floors: [floorSchema],
});

const blockModel = mongoose.model("blocks", BlockSchema);

module.exports = blockModel;
