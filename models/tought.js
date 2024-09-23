const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const user = require('./user')

const tought = db.define('tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

tought.belongsTo(user)
user.hasMany(tought)

module.exports = tought