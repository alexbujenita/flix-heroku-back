const express = require("express");
const applyApi = require("./src/routes").applyApi;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://flix-heroku.vercel.app"],
    credentials: true,
  })
);

app.use("/test", (req, res) => {
  res.send('<h1>WORKS</h1>')
})

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }))

app.use(express.json());

app.use(compression({filter: shouldCompress}))

applyApi(app);
console.log(process.env)
const APP_PORT = process.env.PORT || 5000
app.listen(APP_PORT, () => {
  console.log("Server started on port: " + APP_PORT);
});
