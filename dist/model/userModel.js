"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = User;
const UserMap = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        passwordResetExpires: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        passwordResetToken: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'Users',
        timestamps: true
    });
    User.sync();
};
exports.UserMap = UserMap;
//# sourceMappingURL=userModel.js.map