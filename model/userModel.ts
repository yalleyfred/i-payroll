import { Model, Sequelize, DataTypes } from "sequelize";

export default class User extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public passwordResetToken!: string;
  public passwordResetExpires!: Date;
  public active!: Boolean;
}

/**
 * @openapi 
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         -name
 *         -email
 *         -password
 *         -password2
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         email:
 *            type: string
 *            default: johnDoe@email.com
 *         password:
 *            type: string
 *            default: password123
 *         password2:
 *            type: string
 *            default: password123
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         email:
 *            type: string
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */

export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "Users",
      timestamps: true,
    }
  );
  User.sync();
};
