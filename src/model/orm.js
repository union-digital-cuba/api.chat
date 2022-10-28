import { Sequelize } from 'sequelize'
import { Console } from '../utils/console'
import { Configuration } from '../env/configuration'

const ORM = new Sequelize({
  dialect: 'sqlite',
  storage: './chat.db',
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
      var syncValue = {}

      await ORM.authenticate()
      if (Configuration.DB_SYNC !== 'none') {
        syncValue = Configuration.DB_SYNC === 'alter' ? { alter: true } : { force: true }
        await ORM.sync(syncValue)
        Console.Info(`Syncronization Method: ${Configuration.DB_SYNC}... 🌊`)
      }

      Console.Info('Connection has been established successfully...🌎')

      return true
    } catch (error) {
      Console.Error('Unable to connect to the database: ' + error)
      return false
    }
  },

  Start: async () => {
    try {
      await ORMFunctions.Sync()
    } catch (error) {
      Console.Error('Unable to connect to the database: ' + error)
      return false
    }
  },
}

export { ORM, ORMFunctions }
