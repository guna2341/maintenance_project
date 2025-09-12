const express = require('express');
const router = express.Router();
const blockController = require("../controllers/blockController");
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleWare');

// token verification
router.use(verifyToken);

// role verification
router.use(authorizeRole("admin"));

// data crud operations
router.get("/getBlocks", blockController.getBlocks);

router.post("/addBlocks", blockController.addBlocks);

router.patch("/editBlocks", blockController.editBlocks);

router.delete("/deleteBlocks", blockController.deleteBlocks);

module.exports = router;