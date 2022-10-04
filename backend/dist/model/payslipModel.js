"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipMap = void 0;
const sequelize_1 = require("sequelize");
class Payslip extends sequelize_1.Model {
}
exports.default = Payslip;
const PayslipMap = (sequelize) => {
    Payslip.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        basic_wage: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        allowance: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        bonus: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        income_tax: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        bonus_tax: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        snnit_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        loan_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        total_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        net_salary: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'Payslips',
        timestamps: true
    });
    Payslip.sync();
};
exports.PayslipMap = PayslipMap;
//# sourceMappingURL=payslipModel.js.map