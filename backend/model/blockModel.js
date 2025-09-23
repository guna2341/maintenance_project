const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId:String,
  room: { type: String, required: true },
  state: String,
  issue: String,
  status: {
    type:String,
    default:"disconnected",
    enum: ["connected", "disconnected"]
  }});

const floorSchema = new mongoose.Schema({
  floorId:String,
  block: String,
  rooms: [roomSchema],
});

const BlockSchema = new mongoose.Schema({
  blockId:String,
  block: String,
  floors: [floorSchema],
});

const blockModel = mongoose.model("blocks", BlockSchema);

module.exports = blockModel;
