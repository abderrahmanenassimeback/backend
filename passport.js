const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
var FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
  clientID: "304582068460672",
  clientSecret: "0d6ac61b0b2a67934b551ed01be54eb9",
  callbackURL: 'https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/facebook/callback',
  scope: ["profile", "email"],
},
function (accessToken, refreshToken, profile, callback) {
  callback(null, profile);
}))

passport.use(
  new GoogleStrategy(
    {
      clientID: "876382648000-39d9ftp2qg0fu79lstumd7a49h7ns2oe.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
