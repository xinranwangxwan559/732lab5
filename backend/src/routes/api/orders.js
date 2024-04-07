import express from "express";
import mongoose from "mongoose";
import { Order } from "../../db/schema.js";

const router = express.Router();

// Gets all orders
router.get("/", async (req, res) => {
  const orders = await Order.find({});
  return res.json(orders);
});

// Adds a new order
router.post("/", async (req, res) => {
  const newOrder = new Order({
    order: req.body.map((id) => new mongoose.Types.ObjectId(id))
  });

  await newOrder.save();

  return res.location(`/api/orders/${newOrder._id}`).sendStatus(201);
});

export default router;
