import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@lib/db';

export class Folder extends Model {
    id!: number;
    name!: string;
    parent_id?: number;
    total_child?: number;
}

Folder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_child: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'folders',
    }
);
