import express from "express";
import passport from "passport";

const Oauth = express.Router();

// GOOGLE
Oauth.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

Oauth.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

// GITHUB
Oauth.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["email", "profile"],
  })
);

Oauth.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/protected",
    failureRedirect: "/auth/github/failure",
  })
);

// FACEBOOK
Oauth.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "profile"],
  })
);

Oauth.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/protected",
    failureRedirect: "/auth/facebook/failure",
  })
);

// TWITTER
Oauth.get("/auth/twitter", passport.authenticate("twitter"));

Oauth.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/protected",
    failureRedirect: "/auth/facebook/failure",
  })
);

export default Oauth;
