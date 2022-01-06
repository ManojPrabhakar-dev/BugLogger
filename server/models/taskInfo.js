import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  //   taskID: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  assignee: { type: String, default: "unassigned" },
  Priority: { type: String, default: "Medium" },
  TaskType: { type: String, default: "Task" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskInfo = mongoose.model("TaskInfo", taskSchema);

export default TaskInfo;
