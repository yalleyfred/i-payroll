import { Model, Sequelize, DataTypes } from "sequelize";

export default class Snnit extends Model {
  public id?: number;
  public name!: string;
  public snnit_no!: string;
  public date!: Date;
  public basic_salary!: number;
  public tier_one!: number;
  public tier_two!: number;
  public total_snnit_contribution!: number;
}

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
export const SnnitMap = (sequelize: Sequelize) => {
  Snnit.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      snnit_no: {
        type: DataTypes.STRING,
        unique: true,
      },
      date: DataTypes.DATEONLY,
      basic_salary: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      tier_one: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      tier_two: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      total_snnit_contribution: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Snnit",
      timestamps: true,
    }
  );
  Snnit.sync();
};
