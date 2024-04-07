import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Product, Order } from "../schema.js";

// Test data
const products = [
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000001"),
    name: "Product1",
    cost: 100,
    image: "image1.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000002"),
    name: "Product2",
    cost: 200,
    image: "image2.jpg"
  },
  {
    _id: new mongoose.Types.ObjectId("000000000000000000000003"),
    name: "Product3",
    cost: 300,
    image: "image3.jpg"
  }
];

const orders = [
  {
    // An order for 2 Product1's, a Product3, and a Product2.
    _id: new mongoose.Types.ObjectId("000000000000000000000001"),
    order: [
      new mongoose.Types.ObjectId("000000000000000000000001"),
      new mongoose.Types.ObjectId("000000000000000000000001"),
      new mongoose.Types.ObjectId("000000000000000000000003"),
      new mongoose.Types.ObjectId("000000000000000000000002")
    ]
  },
  {
    // An order for 3 Product3's.
    _id: new mongoose.Types.ObjectId("000000000000000000000002"),
    order: [
      new mongoose.Types.ObjectId("000000000000000000000003"),
      new mongoose.Types.ObjectId("000000000000000000000003"),
      new mongoose.Types.ObjectId("000000000000000000000003")
    ]
  }
];


// TODO: Initialize this, in a beforeAll() block.
let mongod;

// Set up a Mongo memory server for testing
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

// Clear the database and insert the test data before each test
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  await mongoose.connection.db.createCollection('products');
  await mongoose.connection.db.createCollection('orders');

  await Product.insertMany(products);
  await Order.insertMany(orders);
});

// Disconnect and stop the Mongo memory server after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// Test to ensure all Product data can be obtained correctly
it('retrieves all products correctly', async () => {
  const retrievedProducts = await Product.find({});
  expect(retrievedProducts.length).toBe(products.length);
  retrievedProducts.forEach(product => {
    const matchingProduct = products.find(p => p._id.equals(product._id));
    expect(product.name).toBe(matchingProduct.name);
    expect(product.cost).toBe(matchingProduct.cost);
    expect(product.image).toBe(matchingProduct.image);
  });
});

// Test to ensure a specific product is retrieved by ID
it('retrieves a product by ID correctly', async () => {
  const product = await Product.findById("000000000000000000000001");
  expect(product.name).toBe("Product1");
  expect(product.cost).toBe(100);
  expect(product.image).toBe("image1.jpg");
});

// Test to ensure no data is returned for an invalid ID
it('returns null for an invalid product ID', async () => {
  const product = await Product.findById("invalidID");
  expect(product).toBeNull();
});

// Test to ensure a product is correctly retrieved by name
it('retrieves a product by name correctly', async () => {
  const product = await Product.findOne({ name: "Product1" });
  expect(product._id.equals("000000000000000000000001")).toBeTruthy();
  expect(product.cost).toBe(100);
  expect(product.image).toBe("image1.jpg");
});

// Test to ensure an order's products are populated correctly
it('populates products in an order correctly', async () => {
  const order = await Order.findById("000000000000000000000001").populate('order');
  expect(order.order.length).toBe(4);
  expect(order.order[0].name).toBe("Product1");
  expect(order.order[2].name).toBe("Product3");
});




// TODO your code here.
it("is true", () => expect(true).toBeTruthy());
