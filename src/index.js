import express from "express";
import cors from "cors";
import path from "path";
import env from "dotenv";
import googleOauth from "./controller/googleOauth";
import passport from "passport";
import session from "express-session";
env.config();
require("./libs/auth.");
const app = express();
const { PORT, SECRET } = process.env;

//MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/api", googleOauth);

app.get("/", (req, res) => {
  res.send(`<a href="/api/auth/google">Login with google</a>`);
});

//LISTENER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
    SERVER RUNNING TO PORT ${PORT}
    `);
});