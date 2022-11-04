import passport from "passport";
import google from "passport-google-oauth2";
import github from "passport-github2";
import facebook from "passport-facebook";
import env from "dotenv";
env.config();

const GoogleStrategy = google.Strategy;
const GithubStrategy = github.Strategy;
const FacebookStrategy = facebook.Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL_GOOGLE,
  CALLBACK_URL_GITHUB,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  CALLBACK_URL_FACEBOOK,
} = process.env;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

// GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL_GOOGLE,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

// GITHUB
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL_GITHUB,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);

      return done(null, profile);
    }
  )
);

// FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: CALLBACK_URL_FACEBOOK,
      profileFields: [
        "id",
        "email",
        "displayName",
        "name",
        "gender",
        "picture.type(large)",
      ],
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);
