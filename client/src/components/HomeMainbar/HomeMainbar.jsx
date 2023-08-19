import React from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom"
import QuestionList from './QuestionList';
import "./HomeMainbar.css";
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
  const location = useLocation();  //useLocation is something that checks the url path of our website
  const user = null;
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const questionLis = useSelector(state => state.questions)
  questionLis.questions.map(question => {
    console.log(question);
    console.log(question.questionTitle)
  })

  
/*  let questionList = [{
    id:1,
    votes:3,
    noOfAnswers:2,
    questionTitle:"what is the function",
    questionBody:"It meant To be",
    questionTag:["java","node JSON","express js","mongoDB","Javascript","python","c++"],
    userPosted:"Vijay",
    askedOn:"26 jan",
    answer : [
      {
        answerBody:"Answer",
        userAnswered:"Vijay Shirsath",
        answeredOn:"28 jan",
        userId:2
      }
    ]
  },{
    id:2,
    votes:3,
    noOfAnswers:2,
    questionTitle:"what is the function",
    questionBody:"It meant To be",
    questionTag:["java","node JSON","express js","mongoDB","Javascript","python","c++"],
    userPosted:"Vijay",
    askedOn:"26 jan",
    answer : [
      {
        answerBody:"Answer",
        userAnswered:"Vijay Shirsath",
        answeredOn:"28 jan",
        userId:2
      }
    ]
  },{
    id:3,
    votes:3,
    noOfAnswers:2,
    questionTitle:"what is the function",
    questionBody:"It meant To be",
    questionTag:["java","node JSON","express js","mongoDB","Javascript","python","c++"],
    userPosted:"Vijay",
    askedOn:"26 jan",
    answer : [
      {
        answerBody:"Answer",
        userAnswered:"Vijay Shirsath",
        answeredOn:"28 jan",
        userId:2
      }
    ]  
  }
] */
const checkAuth = () => {
    if(auth._id){
      navigate("/AskQuestion")
    }else{
      alert("please sign up to ask the questions");
      navigate("/Auth");
    }
}
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {location.pathname === "/" ? (<h1>Top Questions</h1>):(<h1>All Questions</h1>)}
        <button onClick = {checkAuth} className='ask-btn'>Ask Questions</button>
      </div>
      <div>
        {questionLis.getQuestionStatus === "pending" ? (<h1>Loading</h1>):
        <>
        <p>{questionLis.questions.length} questions</p>
        <QuestionList questionList = {questionLis.questions}/>
        </>}
      </div>
    </div>
  )
}

export default HomeMainbar