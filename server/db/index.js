const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');
const Review = require('./Review');

Order.belongsTo(User);
User.hasMany(Order)
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Product.hasMany(LineItem)
Review.belongsTo(Product);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, Essense, Daphne, War, Timeless, Fire, Ariadne] = await Promise.all([
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
    Product.create({ 
      name: 'Essense',
      description: 'Introducing our exquisite reproduction of a medieval vase, meticulously crafted to capture the essence of the era. This dark-colored masterpiece is a testament to the artistry and intricate details that defined medieval craftsmanship. Every facet of this reproduction has been carefully recreated, ensuring an authentic portrayal of the original medieval vase. From the graceful curves to the ornate patterns, each detail has been meticulously replicated to bring the essence of the medieval period into your space. The dark color palette adds a touch of mystery and elegance to the vase, making it a captivating centerpiece that demands attention. Its deep hues create a dramatic contrast, accentuating the intricate details that adorn its surface. The craftsmanship involved in creating this reproduction is a testament to the dedication and skill of our artisans. They have carefully studied historical references and employed traditional techniques to ensure an accurate representation of medieval artistry. Display this stunning reproduction in your home or office to evoke a sense of medieval charm and sophistication. Whether placed on a mantel, displayed in a curio cabinet, or gracing a prominent spot in your living space, this dark-colored vase is sure to become a cherished heirloom, captivating all who behold its beauty. Own a piece of history with our reproduction of a medieval vase, an embodiment of dark elegance and intricate craftsmanship.',
      rating: 4,
      image: '/static/images/Essense.png',
      price: 189.99
    }),
    Product.create({ 
      name: 'Daphne',
      description: 'Our stunning white vase, a perfect blend of elegance and simplicity. Crafted with meticulous attention to detail, this vase exemplifies refined beauty and timeless style. The pristine white color radiates purity and offers a versatile complement to any decor theme. Its clean lines and smooth contours create a sense of harmony and balance, adding a touch of sophistication to your space. The white hue enhances the vases ability to showcase your favorite flowers and arrangements, allowing their vibrant colors to truly shine. Whether displayed as a standalone piece or as part of a curated collection, this white vase is sure to become a captivating focal point in any room. Elevate your home or office with the understated charm of our white vase, a symbol of grace and elegance that transcends trends and captures the essence of timeless beauty.',
      rating: 5,
      image: '/static/images/Daphne.png',
      price: 224.99
    }),
    Product.create({ 
      name: 'War',
      description: 'Behold our extraordinary brown vase, a captivating work of art that brings ancient battle scenes to life. Immerse yourself in the grandeur of history with this meticulously crafted masterpiece. The rich brown color evokes a sense of warmth and earthiness, providing a fitting canvas for the epic battle scene depicted on its surface. Every detail of the battle has been intricately sculpted, showcasing the bravery and valor of warriors engaged in an intense clash. From the meticulous armor to the expressions of determination on their faces, the level of artistry is awe-inspiring. The brown hues create a sense of antiquity, as if this vase is a relic from a bygone era. Whether displayed on a mantel, showcased in a museum-like setting, or as a conversation-starting centerpiece, this brown vase will transport you to the heart of an ancient battlefield. Embrace the spirit of warriors past with this extraordinary vase, an embodiment of history and art that will leave a lasting impression.',
      rating: 5,
      image: '/static/images/War.png',
      price: 189.99
    }),
    Product.create({ 
      name: 'Timeless',
      description: 'Introducing our beautiful white and blue porcelain vase, a true masterpiece of elegance and craftsmanship. This stunning vase combines the timeless allure of white porcelain with the delicate beauty of intricate blue vines and details. The pure white background serves as a canvas for the enchanting blue patterns that gracefully wind their way around the vase, evoking a sense of harmony and serenity. Each vine and intricate detail is meticulously hand-painted, showcasing the skill and artistry of our talented artisans. The combination of white and blue creates a mesmerizing contrast, capturing the essence of refined sophistication. This porcelain vase is more than just a decorative piece; it is a testament to the rich heritage of porcelain craftsmanship. Display it proudly in your home or office, and let its beauty and elegance be a focal point of admiration. With its delicate charm and timeless appeal, this white and blue porcelain vase with vines and intricate details is sure to evoke a sense of grace and enchantment in any setting.',
      rating: 3,
      image: '/static/images/Timeless.png',
      price: 249.99
    }),
    Product.create({ 
      name: 'Fire',
      description: 'Introducing our exquisite red crystal vase, a breathtaking symbol of opulence and refined beauty. Crafted with precision and artistry, this elegant masterpiece showcases the allure of red crystal in all its splendor. The deep, rich hue of the crystal radiates warmth and passion, creating a captivating focal point in any space. Every facet of this vase has been carefully shaped to enhance the play of light, adding an ethereal glow to its surroundings. The graceful curves and flawless craftsmanship exude sophistication, making it a statement piece that commands attention. Whether displayed on a grand dining table or as a luxurious accent on a mantle, this red crystal vase exudes elegance and elevates the ambiance of any room. The brilliance of the red crystal is a testament to the skill of our master craftsmen who have created a piece that combines beauty, artistry, and timeless allure. Indulge in the allure of luxury with our red crystal vase, a testament to the exquisite beauty that only crystal can bring.',
      rating: 5,
      image: '/static/images/Fire.png',
      price: 329.99
    }),
    Product.create({ 
      name: 'Ariadne',
      description: 'Introducing our exquisite red crystal vase, a breathtaking symbol of opulence and refined beauty. Crafted with precision and artistry, this elegant masterpiece showcases the allure of red crystal in all its splendor. The deep, rich hue of the crystal radiates warmth and passion, creating a captivating focal point in any space. Every facet of this vase has been carefully shaped to enhance the play of light, adding an ethereal glow to its surroundings. The graceful curves and flawless craftsmanship exude sophistication, making it a statement piece that commands attention. Whether displayed on a grand dining table or as a luxurious accent on a mantle, this red crystal vase exudes elegance and elevates the ambiance of any room. The brilliance of the red crystal is a testament to the skill of our master craftsmen who have created a piece that combines beauty, artistry, and timeless allure. Indulge in the allure of luxury with our red crystal vase, a testament to the exquisite beauty that only crystal can bring.',
      rating: 3,
      image: '/static/images/Ariadne.png',
      price: 279.99
    }),
    Review.create({
      name: 'Timeless Vase',
      rating: 1,
      description: "Not great",
    }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: War, quantity: 3});
  await ethyl.addToCart({ product: Daphne, quantity: 2});
  return {
    users: {
      moe,
      lucy,
      larry
    },
    products: {
      Essense,
      War,
      Daphne
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
  Order
};
