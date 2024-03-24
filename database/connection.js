
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : "aritana",
      password : "ari2002",
      database : "locadora"
    }
});

module.exports = knex;