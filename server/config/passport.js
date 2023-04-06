const connectPool = require("../models/dbConnect");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    connectPool.query(
      "SELECT * FROM users WHERE id = ? AND email = ?",
      [jwt_payload._id, jwt_payload.email],
      (error, result, fields) => {
        if (error) {
          return done(error, false);
        } else if (results.length > 0) {
          // 回傳使用者資料
          return done(null, results[0]);
        } else {
          // 找不到使用者
          return done(null, false);
        }
      }
    );
  })
);

module.exports = passport;
