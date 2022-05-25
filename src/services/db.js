import sqlite from 'better-sqlite3'
import path from 'path'

const db = new sqlite(path.resolve('../model/chat.db'), { fileMustExist: true })

export const query = (sql, params) => {
  return db.prepare(sql).all(params)
}

export const run = (sql, params) => {
  return db.prepare(sql).run(params)
}
