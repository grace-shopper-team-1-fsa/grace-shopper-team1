const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123' }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    Product.create({ name: 'foo', description: 'it\'s a foo', rating: 1 }),
    Product.create({ name: 'bar', description: 'it\'s a bar', rating: 2 }),
    Product.create({ name: 'bazz', description: 'it\'s a bazz', rating: 3 }),
    Product.create({ name: 'qux', description: 'it\'s a qux', rating: 4 }),
    Product.create({ name: 'quux', description: 'it\'s a quux', rating: 5 }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3});
  await ethyl.addToCart({ product: foo, quantity: 2});
  return {
    users: {
      moe,
      lucy,
      larry
    },
    products: {
      foo,
      bar,
      bazz
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Product
};
