"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logIn = exports.register = exports.getUser = exports.getAllUsers = exports.SECRET_KEY = void 0;
const errorUtils_1 = require("../utils/errorUtils");
const userModel_1 = __importStar(require("../model/userModel"));
const userServices = __importStar(require("./../service/userService"));
const Database_1 = __importDefault(require("../Database"));
const dotenv = __importStar(require("dotenv"));
const email_1 = require("./../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = "howcanyoutellmethisstory";
dotenv.config();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userModel_1.UserMap)(Database_1.default);
        const result = yield userModel_1.default.findAll();
        res.status(200).json({ users: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userModel_1.UserMap)(Database_1.default);
        const id = Number(req.params.id);
        const result = yield userModel_1.default.findByPk(id);
        res.status(200).json({ user: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getUser = getUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices.register(req.body);
        console.log(req.body);
        res.status(200).send('Inserted successfully');
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.register = register;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield userServices.login(req.body);
        console.log(foundUser);
        const cookieOptions = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true
        };
        if (process.env.NODE_ENV === 'production')
            cookieOptions.secure = true;
        res.cookie('jwt', foundUser.token, cookieOptions);
        res.status(200).send(foundUser);
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.logIn = logIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userServices.forgotPassword(req.body);
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${user === null || user === void 0 ? void 0 : user.resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did'nt forget your password, please ignore this email!`;
        yield (0, email_1.sendEmail)({
            email: "yalleyfred@gmail.com",
            subject: "ipayroll",
            text: 'Your password reset token (valid for 10 min)',
            message: message
        });
        res.status(200).json({
            status: 'success',
            result: resetURL
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, userModel_1.UserMap)(Database_1.default);
    const passwordToken = req.params.token;
    console.log(passwordToken);
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(passwordToken)
        .digest('hex');
    console.log(hashedToken);
    const user = yield userModel_1.default.findOne({
        where: {
            passwordResetToken: passwordToken
        }
    });
    console.log(user);
    // const myUser: {
    //   email: string | null;
    //   password: string | null;
    //   passwordResetToken: string | null;
    //   passwordResetExpires: string | null;
    // } = user;
    if ((!user) || user == null) {
        res.send("oops");
        return new Error('Token is invalid or has expired');
    }
    ;
    user.password = req.body.password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, exports.SECRET_KEY, {
        expiresIn: "1h",
    });
    next();
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=userController.js.map