import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getAllUsers,
  getUser,
  register,
  logIn,
  forgotPassword,
  resetPassword,
} from "../controllers/userCont";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetUserPassword").patch(resetPassword);

router.route("/resetPassword").patch(resetPassword);

router.route("/").get(getAllUsers);

router.get("/:id", getUser);

export default router;
