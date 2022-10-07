import crypto from "crypto";

export const createPasswordResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
    // console.log({resetToken}, passwordResetToken);

    const passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    return {resetToken: resetToken, passwordResetExpires: passwordResetExpires, passwordResetToken: passwordResetToken};
}