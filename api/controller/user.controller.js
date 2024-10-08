import express from "express";
import { errorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import Note from "../model/notes.model.js";
export const test = (req, res) => {
  res.json({
    message: "hello ansistors , meet the best in the bloodline",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can update your own data"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only delete your account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserNotes = async (req, res, next) => {
  console.log(`User ID: ${req.user.id}`);
  console.log(`Requested Note ID: ${req.params.id}`);

  if (req.user.id === req.params.id) {
    try {
      const notes = await Note.find({ userRef: req.user.id });
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own notes!"));
  }
};
