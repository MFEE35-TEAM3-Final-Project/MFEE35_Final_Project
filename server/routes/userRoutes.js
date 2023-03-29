const express = require("express");
const router = express.Router();
const dbConnect = require("../models/dbConnect");
const registerValidation = require("../models/validation").registerValidation;
const loginValidation = require("../models/validation").loginValidation;
const userRegister = require("../models/user").userRegister;

// middleware
router.use((req, res, next) => {
  console.log("A request is coming in to userRoute!");
  next();
});

// routes
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

router.post("/register", (req, res) => {
  console.log("register!!");
  console.log(registerValidation(req.body));
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password, isAdmin } = req.body;

  dbConnect.query(
    "INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)",
    [username, email, password, isAdmin],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting record:", error);
        res.status(500).send("Internal server error.");
      } else {
        console.log("Inserted a new record with ID:", results.insertId);
        res.status(200).send("User registered successfully.");
      }
    }
  );
});

module.exports = router;
