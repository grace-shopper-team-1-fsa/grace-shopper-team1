const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, DOUBLE, DECIMAL } = conn.Sequelize;

const Product = conn.define('product', {
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
  description: {
    type: TEXT,
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
  image: {
    type: STRING,
    defaultvalue: '/static/images/Default.gif',
  },
  price: {
    type: DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Product;
