import { Model, Sequelize, DataTypes } from 'sequelize';

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

export const PayrollMap = (sequelize: Sequelize) => {
    Payroll.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      job_title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      basic_wage: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      allowance: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true
      },
      bonus: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true
      },
      income_tax: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      bonus_tax: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      teir_one: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true
      },
      teir_two: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true
      },
      loan_deduction: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: true
      },
      total_deduction: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      net_salary: {
        type: DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Payroll',
      timestamps: true
    });
    Payroll.sync();
  }


