"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxMap = void 0;
const sequelize_1 = require("sequelize");
class Tax extends sequelize_1.Model {
}
exports.default = Tax;
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
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        tax_relief: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        net_taxable_pay: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        total_tax_deduction: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
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