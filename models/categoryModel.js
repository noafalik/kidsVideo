const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  url_code: String,
  info: String,
  img_url: String,
})
exports.CategoryModel = mongoose.model("categories", schema)

exports.validateCategory = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    url_code: Joi.string().min(2).max(100).required(),
    info: Joi.string().min(2).max(900).required(),
    img_url: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}