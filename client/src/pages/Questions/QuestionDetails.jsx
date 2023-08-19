import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import upvote from "../../assets/sort-up.svg"
import downvote from "../../assets/sort-down.svg"
import Avatar from "../../components/Avatar/Avatar"
import "./Questions.css"

import { useLocation } from 'react-router-dom';
import moment from "moment"
import DisplayAnswer from './DisplayAnswer';
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import { postAnswer } from '../../store/slices/answerSlice';
import { deleteQuestion, getQuestion, voteQuestion } from '../../store/slices/questionSlice';
import { backendUrl } from '../../store/slices/api';

const QuestionDetails = () => {

  const questionList = useSelector(state => state.questions.questions)
  const answers = useSelector(state => state.answers);
  console.log(answers);
  const questionLists = useSelector(state => state.questions)
  console.log(questionLists)
  console.log(questionList.userId)
  const { id } = useParams();
  console.log(id);

  const location = useLocation();
  const url = backendUrl;
  /*  let questionList = [{
        id: "1",
        upVotes: 3,
        downVotes:2,
        noOfAnswers: 2,
        questionTitle: "what is the function",
        questionBody: "It meant To be",
        questionTag: ["java", "node JSON", "express js", "mongoDB", "Javascript", "python", "c++"],
        userPosted: "Vijay",
        askedOn: "26 jan",
        answer: [
            {
                answerBody: "Answer",
                userAnswered: "Vijay Shirsath",
                answeredOn: "28 jan",
                userId: 2
            }
        ]
    }, {
        id: "2",
        upVotes: 3,
        downVotes:2,
        noOfAnswers: 2,
        questionTitle: "what is the function",
        questionBody: "It meant To be",
        questionTag: ["java", "node JSON", "express js", "mongoDB", "Javascript", "python", "c++"],
        userPosted: "Vijay",
        askedOn: "26 jan",
        answer: [
            {
                answerBody: "Answer",
                userAnswered: "Vijay Shirsath",
                answeredOn: "28 jan",
                userId: 2
            }
        ]
    }, {
        id: "3",
        upVotes: 3,
        downVotes:2,
        noOfAnswers: 2,
        questionTitle: "what is the function",
        questionBody: "It meant To be",
        questionTag: ["java", "node JSON", "express js", "mongoDB", "Javascript", "python", "c++"],
        userPosted: "Vijay",
        askedOn: "26 jan",
        answer: [
            {
                answerBody: "Answer",
                userAnswered: "Vijay Shirsath",
                answeredOn: "28 jan",
                userId: 2
            }
        ]
    }
    ]  */

  const [Answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const User = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const HandlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (!User._id) {
      alert("Login or Signup to Answer a Question");
      navigate("/Auth")
    } else {
      if (Answer === "") {
        alert("enter a answer before submitting");
      } else {
        dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.name, userId: User._id }));
        console.log({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.name, userId: User._id })
        setTimeout(() => {
          dispatch(getQuestion());
        }, 500)
      }
    }

  }

  const handleShare = () => {
    const textToCopy = url + location.pathname;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Copied URL: " + textToCopy);
      })
      .catch((error) => {
        console.error("Copy failed:", error);
      });
  }

  const handleDelete = async (_id) => {
    await dispatch(deleteQuestion(_id));

    setTimeout(() => {
      navigate("/");
    }, 1000)

  }

  const handleVote = (values) => {
    const userId = User._id;

    dispatch(voteQuestion({ id, values, userId }));

    setTimeout(() => {
      dispatch(getQuestion());
    }, 500)
  }

  return (
    <div className="question-details-page">
      {questionList === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-upVotes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="upVotes-icon"
                        onClick={() => handleVote("upVote")}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="upVotes-icon"
                        onClick={() => handleVote("downVote")}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {
                            User._id === question.userId && (
                              <button type="button" onClick={() => handleDelete(question._id)}>
                                Delete
                              </button>
                            )
                          }
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* here if the number of answers should be greater than one then the section will be show */}
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => HandlePostAns(e, question.answer.length)}>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(event) => setAnswer(event.target.value)}

                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails