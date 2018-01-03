import * as Sequelize from 'sequelize';
import { BaseModelsInterface } from '../interfaces/BaseModelsInterface';
import { Sequelize, Sequelize } from 'sequelize';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: string;
    createAt?: string;
    updateAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> {}

export interface PostModel extends BaseModelsInterface, Sequelize.Model<PostInstance, PostAttributes>{}{}

export default (Sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = Sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'LONG',
            }),
            allowNull: false,
        }, 
    }, {
        tableName: 'post',
    });

    Post.associate = (models: ModelsInterface) : void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
                
            
        })
    }

    return Post;

}

