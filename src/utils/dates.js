import { DateTime } from 'luxon'

const HelperDate = {
  isDayShift: (date) => {
    const dateAbbreviation = DateTime.fromISO(date).toFormat('a')
    return dateAbbreviation === 'AM'
  },
  differenceByHours: (startTime, endTime) => {
    const diference = startTime.diff(endTime, 'hours')
    const hours = diference.toObject().hours || -1
    return hours
  },
  differenceByDays: (startTime, endTime) => {
    const diference = startTime.diff(endTime, 'days')
    const days = diference.toObject().days || -1
    return days
  },
  getNow: () => {
    const now = DateTime.utc()
    return now
  },
  getNowUTCtoSQL: () => DateTime.utc().toSQL({ includeOffset: false }),
  getSevenDayPassDateFromDate: (date) => {
    const sevenDayPassFromDate = DateTime.fromISO(date).minus({ days: 7 })
    return sevenDayPassFromDate
  },
  getNowString: () => {
    const now = DateTime.utc().toSQL({ includeOffset: false })
    return now
  },
  getDateTime: (date) => {
    const nDate = DateTime.fromSQL(date)
    return nDate
  },
  getDateTimeFromISO: (date) => {
    const nDate = DateTime.fromISO(date)
    return nDate
  },
  getOnlyTimeAsString: (time) => {
    const timeObject = time.toISOTime({ includeOffset: false })
    return timeObject
  },
  getOnlyDateAsString: (date) => {
    const nDate = date.toISODate()
    return nDate
  },
  getDateAsString: (date) => {
    const nDate = date.toSQL({ includeOffset: false })
    return nDate
  },
  getTimeFromString: (time) => {
    const timeObject = DateTime.fromISO(time)
    return timeObject
  },
  addDaysToDateTime: (date, amount) => {
    const dateObject = date.plus({ days: amount })
    return dateObject
  },
  addHoursToDateTime: (date, amount) => {
    const dateObject = date.plus({ hours: amount })
    return dateObject
  },
  addMinutesToDateTime: (date, amount) => {
    const dateObject = date.plus({ minutes: amount })
    return dateObject
  },
  restDaysToDateTime: (date, amount) => {
    const dateObject = date.minus({ days: amount })
    return dateObject
  },
  restHoursToDateTime: (date, amount) => {
    const dateObject = date.minus({ hours: amount })
    return dateObject
  },
  restMinutesToDateTime: (date, amount) => {
    const dateObject = date.minus({ minutes: amount })
    return dateObject
  },
  isSaturday: (date) => {
    return date.weekday === 6
  },
  isSunday: (date) => {
    return date.weekday === 7
  },
  getWeekDayOfDateTime: (date) => {
    return date.weekday
  },
  isWeekEnd: (date) => {
    return this.isSaturday(date) || this.isSunday(date)
  },
}

export { HelperDate, DateTime }
