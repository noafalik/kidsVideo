const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");


let schema = new mongoose.Schema({
  name: String,
  email: String,
  birth_year:Number,
  password: String,
  date_created: {
    type: Date, default: Date.now
  },
  role: {
    type:String, default:"user"
  },
  nickname:String,
  favs_ar:{
    type:Array, default:[]
  }
})
exports.UserModel = mongoose.model("users", schema);

exports.createToken = (user_id,roleUser) => {
  let token = jwt.sign({_id:user_id,role:roleUser},config.tokenSecret,{expiresIn:"600mins"});
  return token;
}


exports.validateJoi = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().min(1).max(300).email().required(),
    birth_year: Joi.number().min(1900).max(2100).required(),
    password: Joi.string().min(1).max(100).required(),
    nickname: Joi.string().min(1).max(100).allow(null,"")
  })
  return joiSchema.validate(_reqBody)
}

exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(1).max(300).email().required(),
    password: Joi.string().min(1).max(100).required(),
  })
  return joiSchema.validate(_reqBody)
}