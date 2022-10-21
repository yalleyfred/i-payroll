"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCont_1 = require("../controllers/userCont");
const router = (0, express_1.Router)();
router.route("/register").post(userCont_1.register);
router.route("/login").post(userCont_1.logIn);
router.route("/forgotPassword").post(userCont_1.forgotPassword);
router.route("/resetPassword").patch(userCont_1.resetPassword);
router.route("/").get(userCont_1.getAllUsers);
router.get("/:id", userCont_1.getUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map