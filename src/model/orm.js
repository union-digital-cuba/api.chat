import { Sequelize } from 'sequelize'
import { Console } from '../utils/handleConsole'

const orm = new Sequelize('sqlite::memory:')

const sync = async () => {
  try {
    await orm.sync()
    Console.Info('All models were synchronized successfully.')
  } catch (error) {
    Console.Error('All models can not be synchronized: ' + error)
  }
}

const start = async () => {
  try {
    await orm.authenticate()
    await orm.sync()

    Console.Info('Connection has been established successfully.')

    return true
  } catch (error) {
    Console.Error('Unable to connect to the database: ' + error)
    return false
  }
}

export { orm, sync, start }
