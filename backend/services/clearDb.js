const blockModel = require("./models/blockModel");

const ResetDb = async () => {
  try {
    await blockModel.updateMany(
      {}, 
      { $set: { "floors.$[].rooms.$[].state": "inactive" } }
    );
    console.log("✅ All room states set to inactive");
  } catch (err) {
    console.error("❌ Error clearing DB:", err);
  }
};

module.exports = { ResetDb };