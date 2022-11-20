import { Model, Sequelize, DataTypes } from "sequelize";

export default class Loan extends Model {
  public id?: number;
  public name!: string;
  public amount!: number;
  public date!: string;
}

/**
 * @openapi 
 * components:
 *   schemas:
 *     CreateLoanInput:
 *       type: object
 *       required:
 *         -name
 *         -amount
 *         -date
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         amount:
 *            type: string
 *            default: 100
 *         date:
 *            type: Date
 *            default: 2022-10-20
 *     CreateLoanResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         amount:
 *            type: string
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */

export const LoanMap = (sequelize: Sequelize) => {
  Loan.init(
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
      amount: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY(),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Loan",
      timestamps: true,
    }
  );
  Loan.sync();
};
