import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getQuestion } from "./store/slices/questionSlice";
import { getAllUsers, loadUser } from "./store/slices/userSlice";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestion());
    dispatch(getAllUsers());
    dispatch(loadUser());
  },[dispatch]);
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
