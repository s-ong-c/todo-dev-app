const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

export const Todo = db.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

export const Assoicate = db.define('assoicates', {
  assoicateId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  parentId: {
    type: Sequelize.INTEGER
  },
  todoId: {
    type: Sequelize.INTEGER
  }
});

Todo.hasMany(Assoicate, { foreignKey: 'todoId' });
Assoicate.belongsTo(Todo, { foreignKey: 'todoId' });

// Assoicate.hasMany(Todo, { foreignKey: 'todoId' });

// Todo.belongsTo(Assoicate);
Assoicate.associate = function associate() {
  Assoicate.belongsTo(Todo, {
    foreignKey: 'todoId'
  });
};
export default db;
