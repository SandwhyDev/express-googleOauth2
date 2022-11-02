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

export default Oauth;
