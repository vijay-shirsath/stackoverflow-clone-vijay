import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import {useDispatch,useSelector} from "react-redux"
import { postQuestion } from "../../store/slices/questionSlice";
const AskQuestion = () => {

  const dispatch = useDispatch();
  const UserName = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [questionTitle,setQuestionTitle] = useState("");
  const [questionBody,setQuestionBody] = useState("");
  const [questionTags,setQuestionTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await dispatch(postQuestion({ questionTitle, questionBody, questionTags, userPosted: UserName.name,userId: UserName._id }));
      console.log(UserName);
  
      // Navigate to the homepage after the question is posted
        navigate("/Questions");
    } catch (error) {
      console.error("Error posting question:", error);
      // Handle error if needed
    }
  };
  

  const handleEnter = (e) => {
    if(e.key === "enter"){
      setQuestionBody(questionBody + "\n");
    }
  }
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(event) => {setQuestionTitle(event.target.value)}}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(event) => {setQuestionBody(event.target.value)}}
                onKeyDown={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={(event) => {setQuestionTags(event.target.value.split(" "))}}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;