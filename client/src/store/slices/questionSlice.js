import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AskQuestionURL, voteQuestionURL } from "./api";

const initialState = {
  questions: [],
  postQuestionStatus: "",
  postQuestionError: "",
  getQuestionStatus: "",
  getQuestionError: "",
  deleteQuestionStatus: "",
  deleteQuestionError: "",
  voteStatus: "",
  voteError: "",
};

export const postQuestion = createAsyncThunk(
  "questions/postQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AskQuestionURL}/Ask`, questionData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "questions/getQuestions",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${AskQuestionURL}/get`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${AskQuestionURL}/delete/${_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

export const voteQuestion = createAsyncThunk(
  "questions/voteQuestion",
  async (votes, { rejectWithValue }) => {
    try {
      const { id, values, userId } = votes;
      console.log(id, values, userId);

      const response = await axios.patch(`${voteQuestionURL}/${id}`, {
        values,
        userId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postQuestion.pending, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "pending",
        postQuestionError: "",
        getQuestionStatus: "",
        getQuestionError: "",
      };
    });
    builder.addCase(postQuestion.fulfilled, (state, action) => {
      return {
        questions: [action.payload, ...state.questions],
        postQuestionStatus: "success",
        postQuestionError: "",
        getQuestionStatus: "",
        getQuestionError: "",
      };
    });
    builder.addCase(postQuestion.rejected, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "rejected",
        postQuestionError: action.payload,
        getQuestionStatus: "",
        getQuestionError: "",
      };
    });

    //get QUestions from the database

    builder.addCase(getQuestion.pending, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "pending",
        getQuestionError: "",
      };
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      return {
        ...state,
        questions: action.payload,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "success",
        getQuestionError: "",
      };
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "rejected",
        getQuestionError: action.payload,
      };
    });

    //delete Question from the database

    builder.addCase(deleteQuestion.pending, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "",
        getQuestionError: "",
        deleteQuestionStatus: "pending",
        deleteQuestionError: "",
      };
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      const deleteQuestion = state.questions.filter(
        (question) => question._id !== action.payload._id
      );
      return {
        ...state,
        questions: deleteQuestion,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "",
        getQuestionError: "",
        deleteQuestionStatus: "success",
        deleteQuestionError: "",
      };
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      return {
        ...state,
        postQuestionStatus: "",
        postQuestionError: "",
        getQuestionStatus: "",
        getQuestionError: "",
        deleteQuestionStatus: "rejected",
        deleteQuestionError: action.payload,
      };
    });

    //voteQuestion from the database
    builder
      .addCase(voteQuestion.pending, (state, action) => {
        console.log("Vote question pending");
        return { ...state, voteStatus: "pending", voteError: "" };
      })
      .addCase(voteQuestion.fulfilled, (state, action) => {
        console.log("Vote question success");
        const questionIndex = state.questions.findIndex(
          (question) => question._id === action.payload.id
        );
        if (questionIndex !== -1) {
          state.questions[questionIndex].voteCount = action.payload.voteCount;
        }
        return { ...state, voteStatus: "success", voteError: "" };
      })
      .addCase(voteQuestion.rejected, (state, action) => {
        return {
          ...state,
          voteStatus: "rejected",
          voteError: action.error.message,
        };
      });

      //getAllUsers from the dataBase with all the values 
  },
});

export default questionSlice.reducer;
