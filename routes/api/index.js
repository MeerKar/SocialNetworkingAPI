const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
// localhost:3001/api/thoughts
router.use("/thoughts", thoughtRoutes);
// localhost:3001/api/users
router.use("/users", userRoutes);

module.exports = router;
