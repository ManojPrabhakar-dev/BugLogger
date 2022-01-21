import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, default: "Medium" },
  creator: { type: String, required: true },
  creatorID: { type: String, required: true },
  assignee: { type: String, default: "unassigned" },
  // TaskType: { type: String, default: "Task" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskInfo = mongoose.model("TaskInfo", taskSchema);

export default TaskInfo;
