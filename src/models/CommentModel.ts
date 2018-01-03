import * as Sequelize from "sequelize";
import { BaseModelsInterface } from '../interfaces/BaseModelsInterface';

export interface CommentAttributes {
    id?: string,
    comment?: string,
    post?: number,
    user?: number,
    createAt?: string,
    updateAt?: string,
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>{}

export interface CommentModel extends BaseModelsInterface, Sequelize.Model<CommentInstance, CommentAttributes>{}

export default ( Sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes ): CommentModel =>{

    const Comment: CommentModel = Sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

    }, {
        tableName: 'comments',
    })

    return Comment;

}
