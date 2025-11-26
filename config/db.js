import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DBname,
  process.env.DBuser,
  process.env.DBpass,
  {
    host: process.env.DBhost || 'localhost',
    port: process.env.DBport || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
    },
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
  } catch (err) {
    console.error('database connection error:', err.message);
    process.exit(1);
  };
};

export {sequelize, testConnection}