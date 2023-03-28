
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});
router.post("/register", (req, res) => {
  console.log("register!!");
});

module.exports = router;
