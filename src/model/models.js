import { ORM } from './orm'
import { DataTypes, Sequelize } from 'sequelize'

const System = ORM.define('system', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  groupInit: { type: DataTypes.BOOLEAN, defaultValue: false },
  userInit: { type: DataTypes.BOOLEAN, defaultValue: false },
  default: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const User = ORM.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: true },
  isSetAvatar: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  image: { type: DataTypes.STRING, allowNull: true },
  defaultGroup: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  activity: { type: DataTypes.DATE, allowNull: true },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const Group = ORM.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  type: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, //Define si el grupo es privado o publico
  createdBy: { type: DataTypes.INTEGER, allowNull: true }, //Usuario que crea el grupo, el dueño
  date: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const User_Group = ORM.define('user_group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

const Message = ORM.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  sender: { type: DataTypes.INTEGER, allowNull: false },
  receiver: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  date: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

// User.Messages = User.hasMany(Message, { targetKey: 'id', foreignKey: 'sender' })
// Message.User = Message.hasOne(User)

// Group.Messages = Group.hasMany(Message)
// Message.Group = Message.hasOne(Group)

User.belongsToMany(Group, { through: User_Group })
Group.belongsToMany(User, { through: User_Group })

export { User, Message, Group, User_Group, System }
