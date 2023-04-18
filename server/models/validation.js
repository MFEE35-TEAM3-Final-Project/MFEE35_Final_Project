const bcrypt = require("bcryptjs");
const Joi = require("joi");

// general users
const registerValidation = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(6).max(30),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    repeat_password: Joi.ref("password"),
    username: Joi.string().max(30),
    phone: Joi.string().pattern(/^\d{9,10}$/),
    address: Joi.string().max(100, "utf8"),
  });

  return userSchema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// Admins
const adminRegValidation = (data) => {
  const schema = Joi.object({
    adminname: Joi.string().min(6).max(30).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    repeat_password: Joi.ref("password"),
  });

  return schema.validate(data);
};
const adminLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
const exerciseRecordsValidation = (data) => {
  const schema = Joi.object({
    gender: Joi.string().valid("female", "male"),
    birthday: Joi.date(),
    weight: Joi.number().min(0),
    height: Joi.number().min(0),
    exercise_level: Joi.number().min(0),
    record_date: Joi.date(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  adminRegValidation,
  adminLoginValidation,
  exerciseRecordsValidation,
};
