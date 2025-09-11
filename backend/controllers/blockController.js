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
    const { block } = req.body;

    if (!block) {
      return res.status(400).json({ message: "Block data is required" });
    }

    const processedBlock = {
      ...block,
      floors: (block.floors || []).map((floor) => ({
        ...floor,
        rooms: floor.rooms || [], 
      })),
    };

    const newBlock = await blockModel.create(processedBlock);

    setTimeout(() => {
      return res
        .status(200)
        .json({ data: newBlock, message: "Block added successfully" });
    }, 2000);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const editBlocks = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !data._id) {
      return res.status(400).json({ message: "Block ID is required" });
    }

    const { _id, ...updatedData } = data;

    // directly get the updated doc
    const updatedBlock = await blockModel.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedBlock) {
      return res.status(404).json({ message: "Block not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedBlock,
      message: "Block updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const deleteBlocks = async (req, res) => {
  try {

    const { id } = req.query;
    await blockModel.findByIdAndDelete(id);

    return res.status(204).json({ message: "Block deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getBlocks, addBlocks, editBlocks, deleteBlocks };
