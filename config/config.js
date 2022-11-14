require('dotenv').config()
module.exports = {
  development: {
    database: 'potlucky_development',
    dialect: 'postgres'
  },
  test: {
    database: 'potlucky_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}

// Old config.json content, delete after deployed successfully
// "development": {
//   "database": "potlucky_development",
//   "host": "127.0.0.1",
//   "dialect": "postgres"
// },
// "test": {
//   "database": "potlucky_test",
//   "host": "127.0.0.1",
//   "dialect": "postgres"
// },
// "production": {
//   "database": "potlucky_production",
//   "host": "127.0.0.1",
//   "dialect": "postgres"
// }
