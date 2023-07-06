const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password:{
            type: DataTypes.STRING,  
            allowNull: false,
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, { timestamps: false, freezeTableName: true });
};
