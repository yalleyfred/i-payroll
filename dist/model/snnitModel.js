"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnnitMap = void 0;
const sequelize_1 = require("sequelize");
class Snnit extends sequelize_1.Model {
}
exports.default = Snnit;
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