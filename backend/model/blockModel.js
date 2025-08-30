const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: false,
  },
  room: String,
  state: {
    type: String,
    enum: ["active", "inactive", "maintenance"],
    default: "inactive",
  },
  issue: {
    type: String,
    required: false,
  },
});

const stateSchema = new mongoose.Schema({
  active: { type: Number, default: 0 },
  inactive: { type: Number, default: 0 },
  maintenance: { type: Number, default: 0 },
});

const floorSchema = new mongoose.Schema({
  id: String, 
  block: String,
  rooms: [roomSchema],
  states: stateSchema,
});

const BlockSchema = new mongoose.Schema({
  block: String,
  floors: [floorSchema],
  states: stateSchema,
});

const blockModel = mongoose.model("blocks", BlockSchema);
module.exports = blockModel;
