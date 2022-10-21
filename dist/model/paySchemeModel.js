"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayMap = void 0;
const sequelize_1 = require("sequelize");
class Pay extends sequelize_1.Model {
}
exports.default = Pay;
const PayMap = (sequelize) => {
    Pay.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        basic_salary: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        allowance: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        bonus: {
            type: sequelize_1.DataTypes.INTEGER || sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "PayScheme",
        timestamps: true,
    });
    Pay.sync();
};
exports.PayMap = PayMap;
//# sourceMappingURL=paySchemeModel.js.map