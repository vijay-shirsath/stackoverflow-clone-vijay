import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteAnswerURL, postAnswerURL } from "./api";
const initialState = {
  answers: [],
  postAnswerStatus: "",
  postAnswerError: "",
  deleteAnswerStatus: "",
  deleteAnswerError: "",
};

export const postAnswer = createAsyncThunk(
  "answers/postAnswer",
  async (answerData, { rejectWithValue }) => {
    console.log(answerData);
    try {
      const response = await axios.patch(
        `${postAnswerURL}/${answerData.id}`,
        answerData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "answers/deleteAnswer",
  async (data, { rejectWithValue }) => {
    try {
      const {id, answerId, noOfAnswers} = data;
      console.log(id, answerId, noOfAnswers);
      const response = await axios.patch(`${deleteAnswerURL}/${id}`, {
        answerId,
        noOfAnswers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postAnswer.pending, (state, action) => {
      return {
        ...state,
        postAnswerStatus: "pending",
        postAnswerError: "",
      };
    });
    builder.addCase(postAnswer.fulfilled, (state, action) => {
      const updatedAnswers = state.answers.map(answer =>
        answer._id === action.payload._id ? action.payload : answer
      );
    
      return {
        ...state,
        answers: updatedAnswers,
        postAnswerStatus: "success",
        postAnswerError: "",
      };
    });
    builder.addCase(postAnswer.rejected, (state, action) => {
      return {
        ...state,
        postAnswerStatus: "rejected",
        postAnswerError: action.payload,
      };
    });

    //delete the specific answer fron the database

    builder.addCase(deleteAnswer.pending, (state, action) => {
      return {
        ...state,
        postAnswerStatus : "",
        postAnswerError : "",
        deleteAnswerStatus : "pending",
        deleteAnswerError : "",
      };
    });
    builder.addCase(deleteAnswer.fulfilled, (state, action) => {
      const deletedAnswerId = action.payload.deletedAnswerId;
    
      return {
        ...state,
        answers: state.answers.filter(answer => answer._id !== deletedAnswerId),
        postAnswerStatus: "",
        postAnswerError: "",
        deleteAnswerStatus: "success",
        deleteAnswerError: "",
      };
    });
    
    builder.addCase(deleteAnswer.rejected, (state, action) => {
      return {
        ...state,
        postAnswerStatus: "",
        postAnswerError: "",
        deleteAnswerStatus: "rejected",
        deleteAnswerError: action.payload,
      };
    });
  },
});

export default answerSlice.reducer;
