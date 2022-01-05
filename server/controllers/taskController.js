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

  const newTask = new TaskInfo({
    ...task,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
