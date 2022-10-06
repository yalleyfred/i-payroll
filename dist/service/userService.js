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
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = exports.SECRET_KEY = void 0;
const userModel_1 = __importStar(require("../model/userModel"));
const Database_1 = __importDefault(require("../Database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resetToken_1 = require("../utils/resetToken");
exports.SECRET_KEY = "howcanyoutellmethisstory";
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, userModel_1.UserMap)(Database_1.default);
            let newUser = user;
            const username = yield userModel_1.default.findOne({
                where: {
                    email: newUser.email
                }
            });
            if (newUser.email == (username === null || username === void 0 ? void 0 : username.email)) {
                console.log('You are already a user.');
                throw new Error("You are already a user.");
            }
            else {
                const salt = 10;
                const hashedPassword = yield bcrypt_1.default.hash(newUser.password, salt);
                const user = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    password: hashedPassword
                };
                const registeredUser = yield userModel_1.default.create(user);
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, exports.SECRET_KEY, {
                    expiresIn: "1h",
                });
                return { user: registeredUser, token: token };
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.register = register;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, userModel_1.UserMap)(Database_1.default);
            const foundUser = yield userModel_1.default.findOne({ where: {
                    email: user.email
                } });
            if (!foundUser) {
                throw new Error('Email of user is not correct');
            }
            const isMatch = bcrypt_1.default.compareSync(user.password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ id: foundUser.id, email: foundUser.email }, exports.SECRET_KEY, {
                    expiresIn: "1h",
                });
                console.log(token);
                return { user: foundUser.email, token: token };
            }
            else {
                throw new Error('Password is not correct');
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
function forgotPassword(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, userModel_1.UserMap)(Database_1.default);
            const theUser = yield userModel_1.default.findOne({
                where: {
                    email: user.email
                }
            });
            console.log(theUser === null || theUser === void 0 ? void 0 : theUser.passwordResetExpires);
            if (!theUser) {
                console.log('There is no user with that mail');
                throw new Error('There is no user with that mail');
            }
            const reset = (0, resetToken_1.createPasswordResetToken)();
            console.log(reset);
            yield userModel_1.default.update({
                theUser, passwordResetToken: reset.passwordResetToken,
                theUser, passwordResetExpires: reset.passwordResetExpires
            }, {
                where: {
                    email: user.email
                }
            });
            console.log(theUser === null || theUser === void 0 ? void 0 : theUser.passwordResetToken);
            return { email: theUser.email, resetToken: reset.passwordResetToken };
        }
        catch (error) {
            throw error;
        }
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=userService.js.map