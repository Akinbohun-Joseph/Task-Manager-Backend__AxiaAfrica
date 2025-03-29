const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const authorizeRole =  require('../middleware/authorizeRole')


router.get("/", authMiddleware, getTasks);
router.get("/:taskId", authMiddleware,  authorizeRole('user'), getTask);
router.post("/post", authMiddlware, authorizeRole('user'), postTask);
router.put("/:taskId", authMiddleware, authorizeRole('user'), putTask);
router.delete("/:taskId", authMiddleware, authorizeRole('admin', 'user'), deleteTask);

module.exports = router