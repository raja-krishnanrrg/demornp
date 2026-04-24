
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/role.js";

import {
  getAllUsers,
  deleteUserByAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// 👤 users list
router.get("/users", protect, isAdmin, getAllUsers);

// ❌ delete user
router.delete("/user/:id", protect, isAdmin, deleteUserByAdmin);

export default router;