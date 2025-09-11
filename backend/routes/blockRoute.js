const express = require('express');
const router = express.Router();
const blockController = require("../controllers/blockController");
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleWare');

router.use(verifyToken);

router.use(authorizeRole("admin"));

router.get("/getBlocks", blockController.getBlocks);

router.post("/addBlocks", blockController.addBlocks);

router.patch("/editBlocks", blockController.editBlocks);

router.delete("/deleteBlocks", blockController.deleteBlocks);

module.exports = router;