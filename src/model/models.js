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

const Group = ORM.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
  date: Sequelize.DATE,
})

const User_Group = ORM.define('user_group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  selfGranted: DataTypes.BOOLEAN,
})

const Message = ORM.define('messages', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  from: { type: DataTypes.INTEGER, allowNull: false },
  to: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.INTEGER, allowNull: false },
  date: Sequelize.DATE,
})

User.Messages = User.hasMany(Message)
Message.SendedBy = Message.belongsTo(User)

User.belongsToMany(Group, { through: User_Group })
Group.belongsToMany(User, { through: User_Group })

export { User, Message, Group, User_Group }
