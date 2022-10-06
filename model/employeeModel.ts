import { Model, Sequelize, DataTypes } from 'sequelize';

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

export const EmployeeMap = (sequelize: Sequelize) => {
    Employee.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255)
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      hire_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      snnit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 15
        }
      },
      tin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 11
        }
      },
      department: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      job_title: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'Employees',
      timestamps: true
    });
    Employee.sync();
  }
