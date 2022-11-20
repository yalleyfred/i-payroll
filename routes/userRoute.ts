import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getAllUsers,
  getUser,
  register,
  logIn,
  forgotPassword,
  resetPassword,
  resetUserPassword
} from "../controllers/userCont";

const router = Router();

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

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/forgotPassword").post(forgotPassword);
router.route('/resetUserPassword').patch(resetUserPassword);

router.route("/resetPassword").patch(resetPassword);

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
router.route("/").get(getAllUsers);

router.get("/:id", getUser);

export default router;
