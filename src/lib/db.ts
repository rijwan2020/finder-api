import { Sequelize } from 'sequelize';

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbName = process.env.DB_NAME || '';
const dbUserName = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';

export const sequelize = new Sequelize(
    dbName,
    dbUserName,
    dbPassword,
    {
        host: dbHost,
        dialect: 'mysql',
    }
);
