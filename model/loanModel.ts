import { Model, Sequelize, DataTypes } from "sequelize";

export default class Loan extends Model {
  public id?: number;
  public name!: string;
  public amount!: number;
  public date!: string;
}

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
        type: DataTypes.DATEONLY,
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
