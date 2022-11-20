"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxMap = void 0;
const sequelize_1 = require("sequelize");
class Tax extends sequelize_1.Model {
}
exports.default = Tax;
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTaxInput:
 *       type: object
 *       required:
 *         -name
 *         -date
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         date:
 *            type: Date
 *            default: 2022-03-01
 *     CreateTaxResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         tin:
 *            type: string
 *         date:
 *            type: Date
 *         basic_salary:
 *            type: integer
 *         tax_relief:
 *            type: double
 *         net_taxable_pay:
 *            type: double
 *         total_tax_deduction:
 *            type: double
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */
const TaxMap = (sequelize) => {
    Tax.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        tin: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        date: sequelize_1.DataTypes.DATEONLY,
        basic_salary: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        tax_relief: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        net_taxable_pay: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        total_tax_deduction: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Tax",
        timestamps: true,
    });
    Tax.sync();
};
exports.TaxMap = TaxMap;
//# sourceMappingURL=taxModel.js.map