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
  const [moe, lucy, larry, ethyl, Essense, Daphne, War, Timeless, Fire, Ariadne, Fortress, Resolute, Emerald_vision, Ametrine] = await Promise.all([
    User.create({ 
      password: '123',
      firstName: 'Moe',
      lastName: 'Doe',
      email: 'moed@gmail.com',
      homeAddress: '123 Main St, City A',
      shipAddress: '123 Main St, City A',
      avatar: '/static/images/User Icon.png',
      permissions: true,
    }),
    User.create({ 
      password: '123',
      firstName: 'Lucy',
      lastName: 'Brown',
      email: 'lucyb@gmail.com',
      homeAddress: '456 Elm St, City B',
      shipAddress: '456 Elm St, City B',
      avatar: '/static/images/User Icon.png',
      permissions: false,
    }),
    User.create({ 
      password: '123',
      firstName: 'Larry',
      lastName: 'Green',
      email: 'larryg@gmail.com',
      homeAddress: '789 Oak St, City C',
      shipAddress: '789 Oak St, City C',
      avatar: '/static/images/User Icon.png',
      permissions: false,
    }),
    User.create({ 
      password: '123',
      firstName: 'Ethyl',
      lastName: 'Red',
      email: 'ethylr@gmail.com',
      homeAddress: '987 Pine St, City D',
      shipAddress: '987 Pine St, City D',
      avatar: '/static/images/User Icon.png',
      permissions: false,
    }),
    Product.create({ 
      name: 'Essense',
      description: 'Introducing our exquisite reproduction of a medieval vase "Essense". Meticulously crafted to capture the essence of the era, this dark-colored masterpiece is a testament to the artistry and intricate details that defined medieval craftsmanship. Display this stunning reproduction in your home or office to evoke a sense of medieval charm and sophistication.',
      rating: 4,
      image: '/static/images/Essense.png',
      price: 189.99
    }),
    Product.create({ 
      name: 'Daphne',
      description: 'Discover the captivating beauty of "Daphne", our stunning white vase. Meticulously crafted with meticulous attention to detail, this vase exemplifies refined beauty and timeless style. Elevate your home or office decor with the understated charm and elegance of our white vase. The pristine white color radiates purity and offers a versatile complement to any decor theme. Its clean lines and smooth contours create a sense of harmony and balance, adding a touch of sophistication to your space. The white hue enhances the vase\'s ability to showcase your favorite flowers and arrangements, allowing their vibrant colors to truly shine. Whether displayed as a standalone piece or as part of a curated collection, this white vase is sure to become a captivating focal point in any room. Embrace the enchanting allure of "Daphne" and experience the everlasting elegance it brings to your surroundings.',
      rating: 5,
      image: '/static/images/Daphne.png',
      price: 224.99
    }), 
    Product.create({ 
      name: 'War',
      description: 'Experience the awe-inspiring presence of "War", our extraordinary brown vase. Crafted as a captivating work of art, it brings ancient battle scenes to life. Immerse yourself in the grandeur of history with this meticulously crafted masterpiece. Embrace the spirit of warriors past with this extraordinary vase.',
      rating: 5,
      image: '/static/images/War.png',
      price: 189.99
    }),
    Product.create({ 
      name: 'Timeless',
      description: 'Introducing our beautiful white and blue porcelain vase "Timeless". This exquisite piece is meticulously handcrafted to embody the timeless elegance and impeccable craftsmanship. The pure white background serves as a pristine canvas, while the delicate blue patterns delicately wind their way around the vase, evoking a sense of grace and serenity. Each vine and intricate detail is meticulously hand-painted by our talented artisans, showcasing their dedication and skill. Display this magnificent vase proudly in your home or office, and let its beauty become a captivating focal point of admiration. With its delicate charm and timeless appeal, this white and blue porcelain vase is sure to evoke a sense of grace and enchantment in any setting.',
      rating: 3,
      image: '/static/images/Timeless.png',
      price: 249.99
    }),    
    Product.create({ 
      name: 'Fire',
      description: 'Introducing our exquisite red crystal vase "Fire", a breathtaking symbol of opulence and refined beauty. Crafted with precision and artistry, this elegant masterpiece showcases the allure of red crystal in all its splendor. The deep, rich hue of the crystal radiates warmth and passion, creating a captivating focal point in any space. Every facet of this vase has been carefully shaped to enhance the play of light, adding an ethereal glow to its surroundings. The graceful curves and flawless craftsmanship exude sophistication, making it a statement piece that commands attention. Whether displayed on a grand dining table, an entryway console, or as a luxurious accent on a mantle, this red crystal vase elevates the ambiance of any room, infusing it with an air of elegance and enchantment. Indulge in the allure of luxury with our red crystal vase, a testament to the exquisite beauty that only crystal can bring.',
      rating: 5,
      image: '/static/images/Fire.png',
      price: 329.99
    }),    
    Product.create({ 
      name: 'Ariadne',
      description: 'Immerse yourself in the rich heritage of the past with "Ariadne", our beautifully handcrafted Medieval Reproduction Vase. This exquisite piece pays homage to the robust form of medieval craftsmanship, capturing its essence with meticulous attention to detail. The vase showcases intricate, labyrinthine patterns inspired by the era, offering a glimpse into the artistry and ingenuity of ancient artisans. "Ariadne" is more than just a decor item; its a slice of history, a narrative in ceramic that tells the tale of the bygone era. Its presence serves as a testament to artistry and tradition, a timeless piece that transcends time and space. Display "Ariadne" proudly in your home or office, and let its beauty transport you to a world steeped in history and craftsmanship.',
      rating: 3,
      image: '/static/images/Ariadne.png',
      price: 279.99
    }),           
    Product.create({ 
      name: 'Ametrine',
      description: "A magnificent reproduction of a medieval tall floor vase dubbed \"Ametrine\", exuding timeless elegance and regal charm. Crafted with meticulous attention to detail, this stunning piece features a pristine white body adorned with exquisite purple accents, reminiscent of the opulent artistry of a bygone era. Standing gracefully at an impressive height, it commands attention and serves as a captivating focal point in any space. Whether displayed as a standalone masterpiece or filled with lush botanical arrangements, this vase is sure to elevate your decor with its majestic allure.'",
      rating: 5,
      image: '/static/images/Ametrine.png',
      price: 479.99
    }),
    Product.create({ 
      name: 'Emerald Vision',
      description: "'Emerald Vision' is an enchanting desk top vase that embodies the essence of nature's beauty. Crafted with precision, this captivating piece showcases translucent green glass, reminiscent of a mesmerizing emerald gem. Its delicate curves and flawless design effortlessly elevate any space, adding a touch of elegance and serenity. Whether displaying a single bloom or a curated arrangement, 'Emerald Vision' grants a glimpse into a world of tranquility and inspires a sense of wonder in every beholder.",
      rating: 3,
      image: '/static/images/Emerald Vision.png',
      price: 189.99
    }),
    Product.create({ 
      name: 'Resolute',
      description: "'Resolute' is a remarkable square-shaped vase that exudes an air of strength and sophistication. Crafted with meticulous artistry, this extraordinary piece is made of hammered silver, showcasing a shimmering surface that reflects light with grace. Its intricate details and masterful design speak to the unwavering commitment to excellence. 'Resolute' stands as a testament to the power of timeless craftsmanship, effortlessly elevating any space with its undeniable charm. Whether displayed alone or filled with a striking floral arrangement, it leaves an indelible impression on all who encounter it, a symbol of resolute beauty and enduring elegance.",
      rating: 4,
      image: '/static/images/Resolute.png',
      price: 149.99
    }),
    Product.create({ 
      name: 'Fortress',
      description: "'Fortress' is an awe-inspiring short and round vase that transports you to the medieval era. Its captivating design features intricate scenes from the outer walls of a stronghold, depicting the grandeur and strength of a bygone era. Crafted with meticulous attention to detail, this remarkable piece evokes a sense of history and adventure. The round shape and compact size make it a versatile addition to any space, adding a touch of medieval charm. Whether displaying a single stem or a small arrangement, 'Fortress' becomes a testament to the resilience and power that echoes through the ages, preserving the spirit of the past in a timeless masterpiece.",
      rating: 5,
      image: '/static/images/Fortress.png',
      price: 279.99
    }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: War, quantity: 3});
  await ethyl.addToCart({ product: Daphne, quantity: 2});
  await ethyl.createOrder();
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
