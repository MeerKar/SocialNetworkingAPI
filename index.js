const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();
const activity = cwd.includes("01-Activities")
  ? cwd.split("01-Activities")[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// GET localhost:3001/
app.get("/", (req, res) => {
  res.json({ success: true });
});
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for  running on port ${PORT}!`);
  });
});
