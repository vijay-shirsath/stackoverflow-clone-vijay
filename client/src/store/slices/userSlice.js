import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUserProfile, getAllUsersAuth, url } from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  getAllUsers: [],
  updateUser: [],
  name: "",
  email: "",
  id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  getUserStatus: "",
  getUserError: "",
  updateUserProfileStatus: "",
  updateUserProfileError: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", token.data);
      console.log(token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "questions/getAllUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getAllUsersAuth}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ _id, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${editUserProfile}/${_id}`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        //state.token is nothing but we don on extrareducers that we added token on register.fulfilled and login.fulfilled

        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },

  //extraReducers

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      //here action is htttps and state is our reducx toolkit state we are updating
      console.log(action.payload + "action.payload");
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    //for login
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload + "action.payload login");
      if (action.payload) {
        const user = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    //get all the users from the database

    builder
      .addCase(getAllUsers.pending, (state, action) => {
        console.log("Vote question pending");
        return { ...state, getUserStatus: "pending" };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log("Vote question success", action.payload);
        return {
          ...state,
          getAllUsers: action.payload,
          getUserStatus: "success",
        };
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        return {
          ...state,
          getUserStatus: "success",
          getUserError: action.error.message,
        };
      });

    //for updating the userProfile

    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        console.log("update is pending");
        return { ...state, updateUserProfileStatus: "pending" };
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("update is success");
        console.log(action.payload);
        return {
          ...state,
          updateUser: action.payload,
          updateUserProfileStatus: "success",
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        return {
          ...state,
          updateUserProfileStatus: "success",
          updateUserProfileError: action.error.message,
        };
      });
  },
});

export default authSlice.reducer;
export const { loadUser, logoutUser } = authSlice.actions;
