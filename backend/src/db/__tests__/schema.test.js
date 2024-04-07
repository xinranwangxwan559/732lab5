import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Product, Order } from "../schema.js";

// TODO: Initialize this, in a beforeAll() block.
let mongod;

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
