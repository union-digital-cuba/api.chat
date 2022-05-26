import { Sequelize } from 'sequelize'
import { consoleError, consoleInfo } from '../utils/handleConsole'

const orm = new Sequelize('sqlite::memory:')

const sync = async () => {
  try {
    await orm.sync()
    consoleInfo('All models were synchronized successfully.')
  } catch (error) {
    consoleError('All models can not be synchronized: ' + error)
  }
}

const start = async () => {
  try {
    await orm.authenticate()
    await orm.sync()

    consoleInfo('Connection has been established successfully.')

    return true
  } catch (error) {
    consoleError('Unable to connect to the database: ' + error)
    return false
  }
}

export { orm, sync, start }
