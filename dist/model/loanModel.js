"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanMap = void 0;
const sequelize_1 = require("sequelize");
class Loan extends sequelize_1.Model {
}
exports.default = Loan;
const LoanMap = (sequelize) => {
    Loan.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        amount: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Loan',
        timestamps: true
    });
    Loan.sync();
};
exports.LoanMap = LoanMap;
//# sourceMappingURL=loanModel.js.map