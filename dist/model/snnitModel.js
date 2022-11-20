"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnnitMap = void 0;
const sequelize_1 = require("sequelize");
class Snnit extends sequelize_1.Model {
}
exports.default = Snnit;
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSnnitInput:
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
 *     CreateSnnitResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         snnit_no:
 *            type: string
 *         hire_date:
 *            type: Date
 *         basic_salary:
 *            type: integer
 *         teir_one:
 *            type: double
 *         teir_two:
 *            type: double
 *         total_snnit_contribution:
 *            type: double
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */
const SnnitMap = (sequelize) => {
    Snnit.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        snnit_no: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        date: sequelize_1.DataTypes.DATEONLY,
        basic_salary: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        tier_one: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        tier_two: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        total_snnit_contribution: {
            type: sequelize_1.DataTypes.DOUBLE || sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Snnit",
        timestamps: true,
    });
    Snnit.sync();
};
exports.SnnitMap = SnnitMap;
//# sourceMappingURL=snnitModel.js.map