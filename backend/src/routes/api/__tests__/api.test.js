import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Product, Order } from "../../../db/schema.js";
import express from "express";
import router from "../index.js";
import request from "supertest";

// TODO: Initialize this, in a beforeAll() block.
let mongod;
let app;

// TODO initialize express server, with express.json() middleware, and the "router" above, at /api.
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  // Initialize express server with JSON middleware and router
  app = express();
  app.use(express.json());
  app.use("/api", router);
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  // Insert the test data before each test
  await Product.insertMany(products);
  await Order.insertMany(orders);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// Test for getting all products
it('retrieves all products successfully', async () => {
  const response = await request(app).get('/api/products');
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(products.length);
  // Check if all products are returned and _id is converted to string
  response.body.forEach(product => {
    expect(products.some(p => p._id.toString() === product._id)).toBeTruthy();
  });
});

// Test for getting all orders
it('retrieves all orders successfully', async () => {
  const response = await request(app).get('/api/orders');
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(orders.length);
  // Check if all orders are returned and _id is converted to string
  response.body.forEach(order => {
    expect(orders.some(o => o._id.toString() === order._id)).toBeTruthy();
  });
});

// Test for adding a new order
it('adds a new order successfully', async () => {
  const newOrder = {
    order: [
      "000000000000000000000001",
      "000000000000000000000003"
    ]
  };

  const postResponse = await request(app).post('/api/orders').send(newOrder);
  expect(postResponse.status).toBe(201);

  // Verify the order was added in the database
  const ordersInDb = await Order.find();
  expect(ordersInDb.length).toBe(orders.length + 1); // One more order than the initial dummy data
  const addedOrder = ordersInDb.find(order => order.order.some(productId => productId.toString() === "000000000000000000000001"));
  expect(addedOrder).toBeTruthy(); // Check if the new order exists
  expect(addedOrder.order.some(productId => productId.toString() === "000000000000000000000003")).toBeTruthy(); // Check if the new order contains the correct products
});

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

// TODO your code here.
it("is true", () => expect(true).toBeTruthy());
