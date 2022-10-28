import { ORM } from './orm'
import { DataTypes, Sequelize } from 'sequelize'

const User = ORM.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: true },
  isSetAvatar: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  image: { type: DataTypes.STRING, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const Message = ORM.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  date: Sequelize.DATE,
})

User.Messages = User.hasMany(Message)
Message.SendedBy = Message.belongsTo(User, { as: 'sendedBy', foreignKey: 'sendedById' })
Message.SendedTo = Message.hasOne(User, { as: 'sendedTo', foreignKey: 'sendedToId' })

// sync({ force: 'true' })

export { User, Message }
