import { HelperDate } from './dates'

export const Console = {
  Log: (message) => {
    console.log(`${HelperDate.getNowUTCtoSQL()} : Log => ${message}`)
  },
  Error: (message) => {
    console.error(`${HelperDate.getNowUTCtoSQL()} : Error => ${message}`)
  },
  Info: (message) => {
    console.info(`${HelperDate.getNowUTCtoSQL()} : Info => ${message}`)
  },
  Warn: (message) => {
    console.warn(`${HelperDate.getNowUTCtoSQL()} : Warn => ${message}`)
  },
}
