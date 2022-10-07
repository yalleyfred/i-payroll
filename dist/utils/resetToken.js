"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPasswordResetToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createPasswordResetToken = () => {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const passwordResetToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    // console.log({resetToken}, passwordResetToken);
    const passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return { resetToken: resetToken, passwordResetExpires: passwordResetExpires, passwordResetToken: passwordResetToken };
};
exports.createPasswordResetToken = createPasswordResetToken;
//# sourceMappingURL=resetToken.js.map