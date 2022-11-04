import express from "express";

const views_controller = express.Router();
const isLoggedIn = (req, res, next) => {
  // console.log(req.user);

  if (!req.user) {
    res.redirect("/");
    return;
  }

  next();
};

views_controller.get("/", (req, res) => {
  res.send(
    `<a href="/api/auth/google">Login with google</a> <br /> <a href="/api/auth/github">Login with github</a> <br /> <a href="/api/facebook/callback">Login with facebook</a>`
  );
});

views_controller.get("/logout", async (req, res) => {
  const destroy = await req.session.destroy();
  const loader = await res.redirect("/");
});

views_controller.get("/protected", isLoggedIn, (req, res) => {
  res.send(
    `Hello ${req.user.displayName}  <br /> <img src="${req.user.photos[0].value}" width="100" height="100" style="border-radius: 100px;" /> <a href="/logout">keluar</a>`
  );
});

export default views_controller;
