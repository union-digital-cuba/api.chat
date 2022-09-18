import { Sequelize } from 'sequelize'
import { Console } from '../utils/handleConsole'

const ORM = new Sequelize('sqlite::memory:', {
  logging: false,
  dialectOptions: {
    // useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
})

const ORMFunctions = {
  Sync: async () => {
    try {
      await ORM.sync({ force: true })
      Console.Info('All models were synchronized successfully.')
    } catch (error) {
      Console.Error('All models can not be synchronized: ' + error)
    }
  },

  Start: async () => {
    try {
      await ORM.authenticate()
      await ORM.sync()

      Console.Info('Connection has been established successfully.')

      return true
    } catch (error) {
      Console.Error('Unable to connect to the database: ' + error)
      return false
    }
  },
}

export { ORM, ORMFunctions }
