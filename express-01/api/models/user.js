import { DataTypes } from "sequelize";

const user = (sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  return User;
};

export default user;