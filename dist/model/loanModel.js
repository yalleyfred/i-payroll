"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanMap = void 0;
const sequelize_1 = require("sequelize");
class Loan extends sequelize_1.Model {
}
exports.default = Loan;
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLoanInput:
 *       type: object
 *       required:
 *         -name
 *         -amount
 *         -date
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         amount:
 *            type: string
 *            default: 100
 *         date:
 *            type: Date
 *            default: 2022-10-20
 *     CreateLoanResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         amount:
 *            type: string
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */
const LoanMap = (sequelize) => {
    Loan.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY(),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "Loan",
        timestamps: true,
    });
    Loan.sync();
};
exports.LoanMap = LoanMap;
//# sourceMappingURL=loanModel.js.map