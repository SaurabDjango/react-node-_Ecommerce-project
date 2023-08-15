const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwt = require('jsonwebtoken');

const { User } = require('./models/dataList');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'ILove_Node',
};

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    //console.log(payload.id);
    const user = await User.findOne({ _id: payload.id });
    //console.log("======DATA FROM Passport--js",user);

    if (user) {
      return done(null, user);
    } else {
        console.log("not user");
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

module.exports = passport;