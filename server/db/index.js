const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');
const Review = require('./Review');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Review.belongsTo(Product);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, foo, bar, bazz] = await Promise.all([
    User.create({ 
      username: 'moe',
      password: '123',
      firstName: 'Moe',
      lastName: 'Doe',
      email: 'moed@gmail.com',
      homeAddress: '123 Main St, City A',
      shipAddress: '123 Main St, City A',
      avatar: 'https://tinyurl.com/2ssnj3cf',
      permissions: true,
    }),
    User.create({ 
      username: 'lucy',
      password: '123',
      firstName: 'Lucy',
      lastName: 'Brown',
      email: 'lucyb@gmail.com',
      homeAddress: '456 Elm St, City B',
      shipAddress: '456 Elm St, City B',
      avatar: 'https://tinyurl.com/2ssnj3cf',
      permissions: false,
    }),
    User.create({ 
      username: 'larry',
      password: '123',
      firstName: 'Larry',
      lastName: 'Green',
      email: 'larryg@gmail.com',
      homeAddress: '789 Oak St, City C',
      shipAddress: '789 Oak St, City C',
      avatar: 'https://tinyurl.com/2ssnj3cf',
      permissions: false,
    }),
    User.create({ 
      username: 'ethyl',
      password: '123',
      firstName: 'Ethyl',
      lastName: 'Red',
      email: 'ethylr@gmail.com',
      homeAddress: '987 Pine St, City D',
      shipAddress: '987 Pine St, City D',
      avatar: 'https://tinyurl.com/2ssnj3cf',
      permissions: false,
    }),
    Product.create({ name: 'foo', description: 'it\'s a foo', rating: 1 }),
    Product.create({ name: 'bar', description: 'it\'s a bar', rating: 2 }),
    Product.create({ name: 'bazz', description: 'it\'s a bazz', rating: 3 }),
    Product.create({ name: 'qux', description: 'it\'s a qux', rating: 4 }),
    Product.create({ name: 'quux', description: 'it\'s a quux', rating: 5 }),
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
