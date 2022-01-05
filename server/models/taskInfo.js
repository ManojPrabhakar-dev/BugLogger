import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  //   taskID: String,
  title: String,
  description: String,
  creator: String,
  assignee: { type: String, default: "unassigned" },
  level: { type: String, default: "Medium" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskInfo = mongoose.model("TaskInfo", taskSchema);

export default TaskInfo;
