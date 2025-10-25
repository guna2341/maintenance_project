const changeState = async (req, res) => {
  try {
    const { blockId, floorId, roomId, status } = req.body;
    await blockModel.updateOne(
      { blockId },
      {
        $set: {
          "floors.$[floor].rooms.$[room].status": status
        },
      },
      {
        arrayFilters: [{ "floor.floorId": floorId }, { "room.roomId": roomId }],
      }
    );
  } catch (err) {
    console.log(err);
  }
};
