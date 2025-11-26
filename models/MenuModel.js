import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    ingredients: DataTypes.JSON,
    description: DataTypes.TEXT,
  },
  {
    tableName: "menu",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default Menu;
