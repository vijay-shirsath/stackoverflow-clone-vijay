import Questions from "../models/Questions.js"
import mongoose from "mongoose";

export const AskQuestion = async (req,res) => {
    const {questionTitle, questionBody, questionTags, userPosted, userId} = req.body;
    const newQuestion = new Questions({
        questionTitle,
        questionBody,
        questionTags,
        userPosted,
        userId, // Store the user's ID with the question                              
    })
    
    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.log(error);
        res.status(409).json("couldnt post a question")
    }
};

export const deleteQuestion = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Question unavailable...");
    }
    try {
        const deletedQuestion = await Questions.findByIdAndDelete(id); // Use 'await' to wait for the deletion
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const voteQuestion = async (req,res) => {
    const {id : _id} = req.params;
    const {values,userId} = req.body;

    console.log(values,userId,_id)
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }

    try {
        const question = await Questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        const upIndex =question.upVote.findIndex((id) => id === String(userId));
        const downIndex = question.downVote.findIndex(id => id === String(userId));

        console.log(upIndex,downIndex);
        if(values === "upVote"){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter(id => id !== String(userId));
            }if(upIndex === -1) {
                question.upVote.push(userId);
            }else{
                question.upVote = question.upVote.filter(id => id !== String(userId));    
            }
        }else if(values === "downVote"){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter(id => id !== String(userId));
            }if(downIndex === -1) {
                question.downVote.push(userId);
            }else{
                question.downVote = question.downVote.filter(id => id !== String(userId));    
            }
        }

        
        await Questions.findByIdAndUpdate(_id,question);
        res.status(200).json({message : "Voted Succesfully"});
    } catch (error) {
        res.status(404).json({message : "id not found"});
    }
}
