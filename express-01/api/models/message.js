import { DataTypes } from "sequelize";

const message = (sequelize) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;