import { Model, Sequelize, DataTypes } from "sequelize";

export default class Employee extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public hire_date!: Date;
  public job_title!: string;
  public department!: string;
  public status!: string;
  public snnit!: string;
  public tin!: string;
}

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

export const EmployeeMap = (sequelize: Sequelize) => {
  Employee.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      snnit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Employees",
      timestamps: true,
    }
  );
  Employee.sync();
};
