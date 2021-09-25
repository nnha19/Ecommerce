const jwt = require("jsonwebtoken");
const Question = require("../Models/Question");

const getQuestionsByProductId = async (req, res) => {
  const { productId } = req.params;
  const questions = await Question.find({ productId });
  res.status(200).json(questions);
};

const postQuestions = async (req, res) => {
  try {
    const { question, userId } = req.body;
    const { productId } = req.params;
    if (question) {
      //create a question
      try {
        const newQuestion = await Question.create({
          productId,
          question: { q: question, timeStamp: new Date() },
          userId,
        });
        res.status(200).json(newQuestion);
      } catch (err) {
        console.log(err);
      }
    } else {
      //create an answer
      const token = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
      if (token && token.admin) {
        const { qid, answer } = req.body;
        const question = await Question.findById(qid);
        question.answer = { a: answer, timeStamp: new Date() };
        await question.save();
        res.status(200).json(question);
      } else {
        res.status(400).json("Authorization failed");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.postQuestions = postQuestions;
exports.getQuestionsByProductId = getQuestionsByProductId;
