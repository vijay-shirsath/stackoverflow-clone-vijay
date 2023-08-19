import bcrypt from "bcrypt"
import User from "../models/auth.js"
import Joi from "joi";
import { getAuthToken } from "../utils/getAuthToken.js";
// Controller function for user signup
export const signup = async (req, res) => {

   const schema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().min(3).max(200).required().email(),
    password:Joi.string().min(6).max(1024).required(),
});

const {error} = schema.validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({email:req.body.email});
if(user) return res.status(400).send("user is already exists");

user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
});

const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password,salt);

user = await user.save();

const token = getAuthToken(user);
res.send(token);
}

// Controller function for user login
export const login = async (req, res) => {

  const schema = Joi.object({
    email : Joi.string().min(3).max(200).required().email(),
    password:Joi.string().min(6).max(1024).required(),
});

const {error} = schema.validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({email:req.body.email});
if(!user) return res.status(400).send("invalid email or the password");

console.log(user);
const isValid = await bcrypt.compare(req.body.password,user.password);
console.log(isValid)
if(!isValid) return res.status(400).send("invalid email or the password");

const token = getAuthToken(user);
res.send(token);
}
