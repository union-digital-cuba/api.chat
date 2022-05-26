import { orm, sync } from './orm'
import { DataTypes } from 'sequelize/types'

const User = orm.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
})

const Message = orm.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
})

User.Messages = User.hasMany(Message)
Message.SendedBy = Message.belongsTo(User)
Message.SendedTo = Message.hasOne(User)

sync()

export { User, Message }
