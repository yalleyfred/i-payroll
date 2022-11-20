import { Model, Sequelize, DataTypes } from "sequelize";

export default class Payroll extends Model {
  public id?: number;
  public name!: string;
  public job_title!: string;
  public email!: string;
  public date!: Date;
  public basic_wage!: number;
  public allowance!: number;
  public bonus!: number;
  public income_tax!: number;
  public bonus_tax!: number;
  public teir_one!: number;
  public teir_two!: number;
  public loan_deduction!: number;
  public total_deduction!: number;
  public net_salary!: number;
}

/**
 * @openapi 
 * components:
 *   schemas:
 *     CreatePayrollInput:
 *       type: object
 *       required:
 *         -name
 *         -date
 *       properties:
 *         name:
 *            type: string
 *            default: john Doe
 *         month_year:
 *            type: Date
 *            default: 2022-03-01
 *     CreatePayrollResponse:
 *       type: object
 *       properties:
 *         id:
 *            type: string
 *         name:
 *            type: string
 *         email:
 *            type: string
 *         date:
 *            type: Date
 *         job_title:
 *            type: string
 *         basic_salary:
 *            type: integer
 *         allowance:
 *            type: integer
 *         bonus:
 *            type: integer
 *         income_tax:
 *            type: double
 *         bonus_tax:
 *            type: double
 *         teir_one:
 *            type: double
 *         teir_two:
 *            type: double
 *         loan_deduction:
 *            type: double
 *         total_deduction:
 *            type: double
 *         net_salary:
 *            type: double
 *         createdAt:
 *            type: string
 *         updatedAt:
 *            type: string
 */

export const PayrollMap = (sequelize: Sequelize) => {
  Payroll.init(
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
      job_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
      },
      basic_wage: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      allowance: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true,
      },
      bonus: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true,
      },
      income_tax: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      bonus_tax: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      teir_one: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true,
      },
      teir_two: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true,
      },
      loan_deduction: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true,
      },
      total_deduction: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      net_salary: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Payroll",
      timestamps: true,
    }
  );
  Payroll.sync();
};
