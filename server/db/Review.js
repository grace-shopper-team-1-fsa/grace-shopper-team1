const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, DOUBLE } = conn.Sequelize;

const Review = conn.define('review', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: DOUBLE,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Review;