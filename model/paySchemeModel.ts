import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Pay extends Model {
  public id?: number;
  public job_title!: string;
  public basic_salary!: number;
  public allowance!: number;
  public bonus!: number;
}

export const PayMap = (sequelize: Sequelize) => {
    Pay.init({
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      job_title: {
        type: DataTypes.STRING(255),
        unique: true
      },
      basic_salary: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      allowance: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false
      },
      bonus: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false
      }      
    }, {
      sequelize,
      tableName: 'PayScheme',
      timestamps: true
    });
    Pay.sync();
  }