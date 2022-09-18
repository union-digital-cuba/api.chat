import { getCurrentDate } from './handleDates'

export const Console = {
  Log: (message) => {
    console.log(`${getCurrentDate()} : Log => ${message}`)
  },
  Error: (message) => {
    console.error(`${getCurrentDate()} : Error => ${message}`)
  },
  Info: (message) => {
    console.info(`${getCurrentDate()} : Info => ${message}`)
  },
  Warn: (message) => {
    console.warn(`${getCurrentDate()} : Warn => ${message}`)
  },
}
