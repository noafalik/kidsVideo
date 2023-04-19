const express = require("express");
const { authAdmin } = require("../middlewares/auth");
const { CategoryModel, validateCategory } = require("../models/categoryModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await CategoryModel.find({}).limit(20);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id
    let data = await CategoryModel.findOne({ _id: id });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/",authAdmin, async (req, res) => {
  let validBody = validateCategory(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let category = new CategoryModel(req.body);
    await category.save();
    res.json(category)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.put("/:id",authAdmin, async (req, res) => {
  let validBody = validateCategory(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let id = req.params.id;
    let data = await CategoryModel.updateOne({ _id: id }, req.body);
    res.json(data)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.delete("/:id",authAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    let data = await CategoryModel.deleteOne({ _id: id });
    res.json(data)
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

module.exports = router;