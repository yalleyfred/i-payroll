"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCont_1 = require("../controllers/userCont");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/v1/users/register:
 *    post:
 *      tags:
 *        - Users
 *      summary: Create user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CreateUserResponse'
 *         500:
 *            description: Bad request
 */
router.route("/register").post(userCont_1.register);
router.route("/login").post(userCont_1.logIn);
router.route("/forgotPassword").post(userCont_1.forgotPassword);
router.route('/resetUserPassword').patch(userCont_1.resetUserPassword);
router.route("/resetPassword").patch(userCont_1.resetPassword);
/**
 *@openapi
 *  /api/v1/users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get all users
 *      responses:
 *        200:
 *          description: All users that exist
 *        500:
 *         description: Bad request
 */
router.route("/").get(userCont_1.getAllUsers);
router.get("/:id", userCont_1.getUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map