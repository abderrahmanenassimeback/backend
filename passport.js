const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: "876382648000-39d9ftp2qg0fu79lstumd7a49h7ns2oe.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/v1/auth/google/callback",
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
