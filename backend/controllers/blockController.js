const blockModel = require("../model/blockModel");

const getBlocks = async (req, res) => {
  try {
    const blocks = await blockModel.find();
   
    setTimeout(() => {
      return res.status(200).json({blocks});
    }, 3000);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addBlocks = async (req, res) => {
  try {
    const { data } = req.body;
    const block = await blockModel.create(data);
    setTimeout(() => {
      return res
        .status(200)
        .json({ data: block, message: "Block added successfully" });
    }, 3000);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const editBlocks = async (req, res) => {
  try {
    const { id, data } = req.body;
    const { _id, ...updatedData } = data;

    await blockModel.findByIdAndUpdate(id, { $set: updatedData }, {new: true});

    const updatedBlock = await blockModel.findById(id);

    setTimeout(() => {
      return res.status(200).json({
        success: true,
        data: updatedBlock,
        message: "Block updated successfully",
      });
    }, 3000);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteBlocks = async (req, res) => {
  try {
    const { id } = req.body;
    await blockModel.findByIdAndDelete(id);
    return res.status(204).json({ message: "Block deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getBlocks, addBlocks, editBlocks, deleteBlocks };
