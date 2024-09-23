const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('BDtoughts', 'root', '', {
    host:'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectado!');
} catch(err) {
    console.log(err); 
    console.log('Não foi possível conectar');  
}

module.exports = sequelize