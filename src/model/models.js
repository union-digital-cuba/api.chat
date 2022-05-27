import { orm, sync } from './orm'
import { DataTypes, Sequelize } from 'sequelize/types'

const User = orm.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
})

const Message = orm.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  date: Sequelize.DATE,
})

User.Messages = User.hasMany(Message)
Message.SendedBy = Message.belongsTo(User, { as: 'sendedBy', foreignKey: 'sendedById' })
Message.SendedTo = Message.hasOne(User, { as: 'sendedTo', foreignKey: 'sendedToId' })

sync()

export { User, Message }
