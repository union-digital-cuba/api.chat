import { query, run } from './db'

//! insert record
function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, config.listPerPage])
  const meta = { page }

  return {
    data,
    meta,
  }
}
//! read record
//! delete all
//! delete one
