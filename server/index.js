import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import QuestionRoutes from "./routes/Questions.js";
import dotenv from "dotenv";
import answerRoute from "./routes/Answers.js"
const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());  //using that we can recieve json data

app.use("/user",userRoutes)  //whenever we use app.use with routes then this is middleware
app.use("/questions",QuestionRoutes)
app.use("/answer",answerRoute);
const connectionString = process.env.DB_URI
mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology: true})
.then(() => console.log("database Connected Succesfully"))
.catch("error",(err) => console.log(err));

/* const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("database connected succesfully");
}) */


app.get("/", (req, res) => {
  res.send("the stackOverflow clone");
});


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
