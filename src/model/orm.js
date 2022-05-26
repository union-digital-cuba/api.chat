import { Sequelize } from 'sequelize'
import { consoleError, consoleInfo } from '../utils/handleConsole'

const orm = new Sequelize('sqlite::memory:')

const syncCompleteModel = async () => {
  try {
    await orm.sync()
    consoleInfo('All models were synchronized successfully.')
  } catch (error) {
    consoleError('All models can not be synchronized: ' + error)
  }
}

export { orm, syncCompleteModel }
