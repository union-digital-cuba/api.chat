import { User } from '../model/models'
import { consoleError, consoleInfo } from '../utils/handleConsole'

//! insert user
const insertUser = async (user) => {
  try {
    const created = await User.create(user)
    consoleInfo(`user has been created`)
    await created.save()
    return created
  } catch (error) {
    consoleError(`insertUser -> ${error.message}`)
    throw new Error(error)
  }
}

//! read users
const getAllUsers = async () => {
  try {
    return await User.findAll()
  } catch (error) {
    consoleError(`getAllUsers -> ${error.message}`)
    throw new Error(error)
  }
}

//! read one user by id
const getUser = async (id) => {
  try {
    const row = await User.findOne({
      where: { id: id },
    })
    return row | null
  } catch (error) {
    consoleError(`getUser -> ${error.message}`)
    throw new Error(error)
  }
}

//! delete one
const deleteUser = async (id) => {
  try {
    const row = await User.findOne({ where: { id: id } })
    if (!row) throw new Error(`user not found: ${id}`)

    await row.destroy()
    consoleInfo(`client ${row.id} has been disable...`)

    return true
  } catch (error) {
    consoleError(`DeshabilitarCliente -> ${error.message}`)
    throw new Error(error)
  }
}

export { insertUser, getAllUsers, getUser, deleteUser }
