import mongoose from "mongoose";
import UserModel from "../models/userInfo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "mprabhak";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json("User Already Exist");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1hr",
    });
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(501).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json("user not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(409).json("Invalid Credentials");
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      {
        expiresIn: "1hr",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(501).json({ message: "Something went wrong" });
    console.log(error);
  }
};
