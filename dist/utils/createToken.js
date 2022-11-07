"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSendToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.SECRET_KEY = config_1.jwt_secret;
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, exports.SECRET_KEY, {
        expiresIn: config_1.jwt_expires_in
    });
};
const createSendToken = (user) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    return { token: token, cookieOptions: cookieOptions };
};
exports.createSendToken = createSendToken;
//# sourceMappingURL=createToken.js.map