import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Payslip extends Model {
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
  public snnit_deduction!: number;
  public loan_deduction!: number;
  public total_deduction!: number;
  public net_salary!: number;
}

export const PayslipMap = (sequelize: Sequelize) => {
    Payslip.init({
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
        type: DataTypes.DATEONLY(),
        allowNull: false
      },
      basic_wage: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false,
      },
      allowance: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      bonus: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      income_tax: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      bonus_tax: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      snnit_deduction: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      loan_deduction: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      total_deduction: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      },
      net_salary: {
        type:  DataTypes.DOUBLE || DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Payslips',
      timestamps: true
    });
    Payslip.sync();
  }
