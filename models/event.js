const User = require('../Db').import('./User.js');

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('event', {
        name: { //name of the event
            type: DataTypes.STRING,
            allowNull: false
        },
        sport: { //type of sport
            type: DataTypes.STRING,
            allowNull: false
        },
        location: { //location of event
            type: DataTypes.STRING,
            allowNull: false
        },
        date: { //day of event
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: { //time event starts
            type: DataTypes.STRING,
            allowNull: false
        },
        endTime: { //time event ends (optional)
            type: DataTypes.STRING,
            allowNull: true
        },
        currentPlayers: { //amount of players currently signed up for event
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxPlayers: { //maximum amount of players allowed to join
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    Event.belongsTo(User, { as: 'createdBy' });

    return Event;
}

