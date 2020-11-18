const User = require('../Db').import('./User.js');
const Event = require('../Db').import('./event.js');

module.exports = (sequelize, DataTypes) => {
    const EventSignUp = sequelize.define('eventSignUp')
    EventSignUp.belongsTo(User, { as: 'player' });
    EventSignUp.belongsTo(Event, { as: 'event' })
    return EventSignUp;
}