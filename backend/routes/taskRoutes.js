import { protect } from "../middleware/authMiddleware.js";

import express from "express";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  updateStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/my", protect, getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

// Admin
router.get("/all", getAllTasks);
router.put("/status/:id", updateStatus)
export default router;

