import { Router } from "express";
import {
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuById
} from "../controller/MenuController.js";
import {groupByCategory, searchFullText} from "../controller/AdvMenuController.js"
import { askGemini } from "../controller/GeminiController.js";

const router = Router();

router.get("/", getAllMenus);
router.post("/", createMenu);
router.get("/group-by-category", groupByCategory);
router.get("/search", searchFullText);
router.post("/ask", askGemini);

router.get("/:id", getMenuById);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
