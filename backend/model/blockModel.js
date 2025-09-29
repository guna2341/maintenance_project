const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  room: { type: String, required: true },
  state: String,
  previousState:String,
  issue: String,
  status: {
    type: String,
    default: "disconnected",
    enum: ["connected", "disconnected"],
  },
});

const floorSchema = new mongoose.Schema({
  floorId: { type: String, required: true },
  block: String,
  rooms: [roomSchema],
});

const BlockSchema = new mongoose.Schema({
  blockId: { type: String, required: true },
  block: String,
  floors: [floorSchema],
});

const blockModel = mongoose.model("blocks", BlockSchema);

module.exports = blockModel;
