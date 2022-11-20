"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMap = void 0;
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
}
exports.default = Employee;
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmployeeInput:
 *       type: object
 *       required:
 *         -name
 *         -email
 *         -hire_date
 *         -job_tite
 *         -department
 *         -status
 *         -snnit
 *         -tin
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         email:
 *            type: string
 *            default: johnDoe@email.com
 *         hire_date:
 *            type: Date
 *            default: 2022-02-18
 *         job_title:
 *            type: string
 *            default: level 1
 *         department:
 *            type: string
 *            default: Tech
 *         status:
 *            type: string
 *            default: Full time
 *         snnit:
 *            type: string
 *            default: 187198788958
 *         tin:
 *            type: string
 *            default: 216771987898
 *     CreateEmployeeResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         email:
 *            type: string
 *         hire_date:
 *            type: Date
 *         job_title:
 *            type: string
 *         department:
 *            type: string
 *         status:
 *            type: string
 *         snnit:
 *            type: string
 *         tin:
 *            type: string
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */
const EmployeeMap = (sequelize) => {
    Employee.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hire_date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        snnit: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        tin: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "Employees",
        timestamps: true,
    });
    Employee.sync();
};
exports.EmployeeMap = EmployeeMap;
//# sourceMappingURL=employeeModel.js.map