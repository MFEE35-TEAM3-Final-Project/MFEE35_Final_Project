const connectPool = require("../models/dbConnect");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    if (Date.now() > jwt_payload.exp * 1000) {
      return done(null, false, { message: "Token 已經過期" });
    }
    connectPool.query(
      "SELECT * FROM users WHERE userId = ? AND email = ?",
      [jwt_payload._id, jwt_payload.email],
      (error, user) => {
        if (error) {
          return done(error, false);
        } else if (user) {
          // 回傳使用者資料
          return done(null, user);
        } else {
          // 找不到使用者
          return done(null, false);
        }
      }
    );
  })
);
module.exports = passport;
