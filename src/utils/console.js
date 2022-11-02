import { HelperDate } from './dates'

export const Console = {
  Log: (message) => {
    console.log(`${HelperDate.getNow()} : Log => ${message}`)
  },
  Error: (message) => {
    console.error(`${HelperDate.getNow()} : Error => ${message}`)
  },
  Info: (message) => {
    console.info(`${HelperDate.getNow()} : Info => ${message}`)
  },
  Warn: (message) => {
    console.warn(`${HelperDate.getNow()} : Warn => ${message}`)
  },
}
