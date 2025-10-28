const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const database = await db();
    const products = await database.collection("products").find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("❌ Lỗi lấy sản phẩm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const database = await db();
    const product = await database
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    console.error("Lỗi lấy chi tiết:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
