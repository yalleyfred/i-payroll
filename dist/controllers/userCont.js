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
exports.resetUserPassword = exports.resetPassword = exports.forgotPassword = exports.logIn = exports.register = exports.getUser = exports.getAllUsers = exports.SECRET_KEY = void 0;
const errorUtils_1 = require("../utils/errorUtils");
const userModel_1 = __importStar(require("../model/userModel"));
const userServices = __importStar(require("../service/userService"));
const Database_1 = require("../Database");
const dotenv = __importStar(require("dotenv"));
const email_1 = require("../utils/email");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const createToken_1 = require("../utils/createToken");
exports.SECRET_KEY = config_1.jwt_secret;
dotenv.config();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userModel_1.UserMap)(Database_1.Database);
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
        (0, userModel_1.UserMap)(Database_1.Database);
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
        const user = yield userServices.register(req.body);
        res.cookie("jwt", user.token, user.cookie);
        res.status(200).json({
            message: "successfully registered",
            token: user.token,
            data: user.user,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.register = register;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield userServices.login(req.body);
        res.cookie("jwt", foundUser.token, foundUser.cookie);
        res.status(200).json({
            message: "Login successful",
            token: foundUser.token,
            cookie: foundUser.cookie,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.logIn = logIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userServices.forgotPassword(req.body);
        const token = user.resetToken === "secret";
        const resetURL = `${req.protocol}://${req.get("host")}/resetuserpassword/${token}`;
        const message = `Forgot your password? Please follow this link to set your new password: ${resetURL}\nIf you did'nt forget your password, please ignore this email!`;
        yield (0, email_1.sendEmail)({
            email: req.body.email,
            subject: "ipayroll",
            message: message,
        });
        res.status(200).json({
            message: "Check your email for link to reset your password",
            result: resetURL,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userModel_1.UserMap)(Database_1.Database);
        const newUser = req.body;
        if (!newUser.oldPassword ||
            !newUser.newPassword ||
            !newUser.confirmPassword) {
            throw new Error("Please provide all fields");
        }
        if (newUser.oldPassword == newUser.newPassword) {
            throw new Error("You cannot use old password, Please set a new password");
        }
        if (newUser.newPassword !== newUser.confirmPassword) {
            throw new Error("password does not match");
        }
        if (newUser.newPassword.length < 6) {
            throw new Error("Password is too short");
        }
        const user = yield userModel_1.default.findOne({
            where: {
                active: true,
            },
        });
        const isMatch = yield bcrypt_1.default.compareSync(newUser.oldPassword, user.password);
        if (!isMatch) {
            throw new Error("old password is incorrect");
        }
        if (!user || user == null) {
            return new Error("Token is invalid or has expired");
        }
        const salt = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newUser.newPassword, salt);
        yield userModel_1.default.update({
            passwordResetExpires: null,
            passwordResetToken: null,
            password: hashedPassword,
            active: false,
        }, {
            where: {
                email: user.email,
            },
        });
        (0, createToken_1.createSendToken)(user);
        next(res.status(200).json({ message: "success" }));
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.resetPassword = resetPassword;
const resetUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userModel_1.UserMap)(Database_1.Database);
        const newUser = req.body;
        if (!newUser.newPassword || !newUser.confirmPassword) {
            throw new Error("Please provide all fields");
        }
        if (newUser.newPassword.length < 6) {
            throw new Error("Password is too short");
        }
        if (newUser.newPassword !== newUser.confirmPassword) {
            throw new Error("password does not match");
        }
        const user = yield userModel_1.default.findOne({
            where: {
                active: true,
            },
        });
        if (!user || user == null) {
            return new Error("Token is invalid or has expired");
        }
        const salt = 10;
        const hashedPassword = yield bcrypt_1.default.hash(newUser.newPassword, salt);
        yield userModel_1.default.update({
            passwordResetExpires: null,
            passwordResetToken: null,
            password: hashedPassword,
            active: false,
        }, {
            where: {
                email: user.email,
            },
        });
        const credentials = (0, createToken_1.createSendToken)(user);
        res.send("success");
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.resetUserPassword = resetUserPassword;
//# sourceMappingURL=userCont.js.map