

module.exports = function(sequelize, DataTypes) {

  return {

    User: sequelize.define('User', {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_staff: DataTypes.INTEGER,
      is_active: DataTypes.INTEGER,
      is_superuser: DataTypes.INTEGER,
      last_login: DataTypes.DATE,
      date_joined: DataTypes.DATE
    }, {
      tableName: 'auth_user', timestamps: false
    }),

    SysUser: sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER, allowNull: false,
        autoIncrement: true,  primaryKey: true
      },
      user_name: { type: DataTypes.STRING, allowNull: false, unique: true },
      realname: DataTypes.STRING,
      shell: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
      gid_id: DataTypes.INTEGER,
      user: DataTypes.STRING,
      hash_method: DataTypes.STRING,
      unixpwd: DataTypes.STRING
    })

  };

};
