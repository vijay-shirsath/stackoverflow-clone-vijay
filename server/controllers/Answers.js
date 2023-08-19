import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  console.log(noOfAnswers, answerBody, userAnswered, userId );

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  updateNoOfQuestions(_id, noOfAnswers);
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  console.log(answerId, noOfAnswers);
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Question unavailable...");
  }
  updateNoOfQuestions(id, noOfAnswers);
  try {
      await Questions.updateOne(
      { _id: id }, // Corrected field name here
      { $pull: { answer: { _id: answerId } } } // Corrected field name here
    );
    res.status(200).json({ deletedAnswerId: answerId, message: "Successfully Deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
