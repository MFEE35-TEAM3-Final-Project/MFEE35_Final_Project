const userRegister = (user, connection) => {
  connection.query(
    "INSERT INTO users (username, email, password, isAdmin) VALUES (?,?, ?, ?, ?)",
    [user.username, user.email, user.password, user.isAdmin],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting record:", error);
      } else {
        console.log("Inserted a new record with ID:", results.insertId);
      }
    }
  );
  connection.end();
};

module.exports.userRegister = userRegister;
