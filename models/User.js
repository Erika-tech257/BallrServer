const database = require("../Db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', { 
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        rating: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        displayname: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        description: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        profilepic: {
            type: DataTypes.STRING, 
            allowNull: true
        } 
    }) 
    return User; 
}
 
