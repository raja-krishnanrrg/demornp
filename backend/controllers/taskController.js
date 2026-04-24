import Task from "../models/Task.js";

// ➕ Create Task
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user.id,
  });

  res.json(task);
};

// 📄 Get My Tasks (Employee)
export const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// 🛠 Update Task (only pending)
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.status !== "pending") {
    return res.status(400).json({ msg: "Cannot edit approved/rejected task" });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  await task.save();

  res.json(task);
};

// ❌ Delete Task
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
};

// 👑 Admin: Get all tasks
export const getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("user", "name email");
  res.json(tasks);
};

// ✅ Approve / Reject
export const updateStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);

  task.status = status; // approved / rejected

  await task.save();

  res.json(task);
};

