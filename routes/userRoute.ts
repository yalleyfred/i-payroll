import { Router } from 'express';
import {auth} from "../middleware/auth";
import {getAllUsers, getUser, register, logIn, forgotPassword, resetPassword} from '../controllers/userCont';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(logIn);
router.route('/forgotPassword').post( forgotPassword);

// router.route('/resetPassword/:token').get(getPage);




router.route('/resetPassword').patch(resetPassword);




// GET - users
router.route('/')
.get(getAllUsers);

// GET - users/:id
router.get('/:id', getUser);


export default router;