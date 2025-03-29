const Task = require("../models/Task");


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

exports.getTask = async (req, res) => {
    try {

        const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
        if (!task) {
            return res.status(400).json({ status: false, msg: "No task found.." });
        }
        res.status(200).json({ msg: "Task found successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const  postTask = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ msg: "Description of task not found" });
        }
        const task = await Task.create({ user: req.user.id, description });
        res.status(200).json({ task, status: true, msg: "Task created successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}

const putTask = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ msg: "Description of task not found" });
        }
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(400).json({ msg: "Task with given id not found" });
        }

        if (task.user != req.user.id) {
            return res.status(403).json({ msg: "You can't update task of another user" });
        }

        task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
        res.status(200).json({ msg: "Task updated successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: " Server Error" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.taskId);
        if (!task) {
            return res.status(400).json({ status: false, msg: "Task with given id not found" });
        }

        if (task.user != req.user.id) {
            return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
        }
        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server Error" });
    }
}
// Get all tasks for the logged-in user with category filtering
const getAllTasks = async (req, res) => {
    try {
        const user = req.user.userId;
        const filter = { user: user };
        const category = req.query.category;

        if (category) {
            filter.category = category;
        }

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
