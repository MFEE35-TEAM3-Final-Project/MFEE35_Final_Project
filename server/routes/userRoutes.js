const express = require("express");
const router = express.Router();
const registerValidation = require("../models/validation").registerValidation;
const loginValidation = require("../models/validation").loginValidation;

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

// routes
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working"
  };
  return res.json(msgObj);
});

router.post("/register", (req, res) => {
  console.log("register!!");
  console.log(registerValidation(req.body));
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
