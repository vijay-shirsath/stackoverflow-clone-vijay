import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import Avatar from "../../components/Avatar/Avatar"
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from '../../store/slices/answerSlice';
import { getQuestion } from '../../store/slices/questionSlice';
const DisplayAnswer = ({ question, handleShare }) => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.auth);
  console.log(question.answer)
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = async (answerId, noOfAnswers) => {
    console.log(answerId, noOfAnswers, id);
    await dispatch(deleteAnswer({ id, answerId, noOfAnswers }));
    setTimeout(() => {
      dispatch(getQuestion());
    }, 500)

  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {
                User._id === ans.userId && (
                  <button
                    type="button"
                    onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                  >
                    Delete
                  </button>
                )
              }
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayAnswer