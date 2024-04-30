const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//http://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:studentId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
