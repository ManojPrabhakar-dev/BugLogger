import express from "express";
import mongoose from "mongoose";

import TaskInfo from "../models/taskInfo.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskInfo.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const task = req.body;
  const { path, mimetype } = req.file;
  let updatedTask = {
    ...task,
    creatorID: req.userId,
    createdAt: new Date().toISOString(),
  };

  if (path) {
    console.log(`filePath: ${path} fileMimeType: ${mimetype}`);
    updatedTask = { ...updatedTask, filePath: path, fileMimeType: mimetype };
  }

  console.log("server task : " + JSON.stringify(updatedTask));
  const newTask = new TaskInfo(updatedTask);

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("server error : " + JSON.stringify(error));
    res.status(409).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No task with id: ${id}`);

  const {
    title,
    description,
    assignee,
    creator,
    creatorID,
    priority,
    status,
    type,
    dueDate,
  } = req.body;
  const updatedPost = {
    title,
    description,
    assignee,
    creator,
    creatorID,
    priority,
    status,
    type,
    dueDate,
    _id: id,
  };

  try {
    const task = await TaskInfo.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const item = await TaskInfo.findById(id);
  if (item && item.creatorID === req.userId) {
    await TaskInfo.findByIdAndDelete(id);
    res.status(200).json("Deleted");
  } else {
    res.status(501).json("Unauthorized : Permission Denied");
  }
};
