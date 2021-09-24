const router = require("express").Router({ mergeParams: true });

const questionController = require("../controllers/questionController");

router.get("/", questionController.getQuestionsByProductId);
router.post("/", questionController.postQuestions);

module.exports = router;
