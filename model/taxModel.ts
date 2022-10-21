import { Model, Sequelize, DataTypes } from "sequelize";

export default class Tax extends Model {
  public id?: number;
  public name!: string;
  public tin!: string;
  public date!: Date;
  public basic_salary!: number;
  public tax_relief!: number;
  public net_taxable_pay!: number;
  public total_tax_deduction!: number;
}

export const TaxMap = (sequelize: Sequelize) => {
  Tax.init(
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
      tin: {
        type: DataTypes.STRING,
        unique: true,
      },
      date: DataTypes.DATEONLY,
      basic_salary: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      tax_relief: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      net_taxable_pay: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      total_tax_deduction: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Tax",
      timestamps: true,
    }
  );
  Tax.sync();
};
