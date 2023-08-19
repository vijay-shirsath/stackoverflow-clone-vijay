import express from "express";
import { AskQuestion, deleteQuestion, voteQuestion } from "../controllers/Questions.js";
import Questions from "../models/Questions.js";
const router = express.Router();

router.post("/Ask", AskQuestion);

router.get("/get", async (req, res) => {
  try {
    const question = await Questions.find().sort({ date: -1 });
    res.send(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.delete("/delete/:id",deleteQuestion);
router.patch("/vote/:id",voteQuestion);
export default router;
