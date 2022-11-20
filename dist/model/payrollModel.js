"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollMap = void 0;
const sequelize_1 = require("sequelize");
class Payroll extends sequelize_1.Model {
}
exports.default = Payroll;
/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePayrollInput:
 *       type: object
 *       required:
 *         -name
 *         -date
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         month_year:
 *            type: Date
 *            default: 2022-03-01
 *     CreatePayrollResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         email:
 *            type: string
 *         date:
 *            type: Date
 *         job_title:
 *            type: string
 *         basic_salary:
 *            type: integer
 *         allowance:
 *            type: integer
 *         bonus:
 *            type: integer
 *         income_tax:
 *            type: double
 *         bonus_tax:
 *            type: double
 *         teir_one:
 *            type: double
 *         teir_two:
 *            type: double
 *         loan_deduction:
 *            type: double
 *         total_deduction:
 *            type: double
 *         net_salary:
 *            type: double
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */
const PayrollMap = (sequelize) => {
    Payroll.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY(),
            allowNull: false,
        },
        basic_wage: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        allowance: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        bonus: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        income_tax: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        bonus_tax: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        teir_one: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        teir_two: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        loan_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        total_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        net_salary: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Payroll",
        timestamps: true,
    });
    Payroll.sync();
};
exports.PayrollMap = PayrollMap;
//# sourceMappingURL=payrollModel.js.map