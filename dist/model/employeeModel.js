"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMap = void 0;
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
}
exports.default = Employee;
const EmployeeMap = (sequelize) => {
    Employee.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        hire_date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false
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
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Employees',
        timestamps: true
    });
    Employee.sync();
};
exports.EmployeeMap = EmployeeMap;
//# sourceMappingURL=employeeModel.js.map