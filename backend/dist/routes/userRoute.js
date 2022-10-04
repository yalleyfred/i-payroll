"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const userController_1 = require("./../controllers/userController");
const router = (0, express_1.Router)();
router.route('/register').post(userController_1.register);
router.route('/login').post(auth_1.auth, userController_1.logIn);
router.route('/forgotPassword').post(userController_1.forgotPassword);
router.route('/resetPassword/:token').patch(userController_1.resetPassword);
// GET - users
router.route('/')
    .get(userController_1.getAllUsers);
// GET - users/:id
router.get('/:id', userController_1.getUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map