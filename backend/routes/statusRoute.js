const express = require('express');
const { switchStatus } = require('../controllers/statusController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleWare');
const router = express.Router();

// token verification
router.use(verifyToken);

// role verification
router.use(authorizeRole("admin"));

router.post("/", switchStatus);

module.exports = router;