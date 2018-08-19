const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require("./helpers/db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    function(email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

      return db
        .getSingleUser(email, password)
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          } else {
            return cb(null, user, { message: "Logged In Successfully" });
          }
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      const { email, password } = jwtPayload;
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return db
        .getSingleUser(email, password)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
