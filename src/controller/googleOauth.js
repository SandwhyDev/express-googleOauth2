import express from "express";
import passport from "passport";

const googleOauth = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  next();
};

googleOauth.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

googleOauth.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/protected",
    failureRedirect: "/auth/google/failure",
  })
);

googleOauth.get("/logout", async (req, res) => {
  const destroy = await req.session.destroy();
  const loader = await res.redirect("/");
});

googleOauth.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.user.picture);
  res.send(
    `Hello ${req.user.displayName} <br /> email kamu ini ya ${req.user.email} <br /> <img src="${req.user.picture}" width="100" height="100" style="border-radius: 100px;" /> <a href="/api/logout">keluar</a>`
  );
});

export default googleOauth;
