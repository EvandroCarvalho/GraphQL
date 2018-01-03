import * as Sequelize from 'sequelize';
import { BaseModelsInterface } from '../interfaces/BaseModelsInterface';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export interface UserAtributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createAt?: string;
    updateAt?: string;
}

export interface UserInstance extends Sequelize.Instance <UserAtributes>, UserAtributes {
    isPassword(encodedPassword: string, password: string) : boolean;
}

export interface UserModel extends BaseModelsInterface, Sequelize.Model<UserAtributes, UserAtributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

    const User: UserModel =
        sequelize.define('User', {

            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING(128),
                allowNull: false,             
            },

            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },

            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true,
                }
            },

            photo:{
                type: DataTypes.BLOB({
                    length: 'long',
                }),
                allowNull: true,
                defaultValue: null
            },
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {  
                    const sault = genSaltSync();
                    user.password = hashSync(user.password, sault);  
                }
            }

        })

    User.prototype.isPassword =  (encodedPassword: string, password: string) : boolean => {
        return compareSync(password, encodedPassword);
    } 

        return User;
}

