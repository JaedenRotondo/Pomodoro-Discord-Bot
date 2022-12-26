module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        userid: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        minutes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      });
}