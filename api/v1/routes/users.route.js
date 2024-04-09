import express from "express";
import UserController from "../controllers/users.controller.js"
import pagination from "../../middlewares/pagination-sorting.js"

const router = express.Router();

router.get("/", UserController.getUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getUser);

export default router;