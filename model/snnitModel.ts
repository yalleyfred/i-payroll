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
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      tier_one: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      tier_two: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
        allowNull: false,
      },
      total_snnit_contribution: {
        type: DataTypes.INTEGER || DataTypes.DOUBLE,
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
