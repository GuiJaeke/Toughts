const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const user = db.define('user', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    senha: {
        type: DataTypes.STRING,
        require: true
    },
})

module.exports = user