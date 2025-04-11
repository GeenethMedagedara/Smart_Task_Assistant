const Tasks = require("../models/Tasks")

const createtask = async (req,res) => {
    try {
        // const { title, description } = req.body

        // const tt = req.body


        const { newTask2 } = req.body

        console.log(newTask2.title)

        const task = new Tasks({
            title: newTask2.title,
            description: newTask2.description,
            category: newTask2.category,
            dueDate: newTask2.dueDate,
            priority: newTask2.priority,
            recurring: newTask2.recurring,
            completed: newTask2.status === 'completed',
        });
        await task.save();

        // console.log(tt)
        // if (!title || !description) {
        //     return res.status(400).json({ message: "Please fill all the fields" })
        // }
        res.status(201).json({ message: "Task created successfully" })
    } catch (error) {
        console.log(error) 
        res.status(500).json(error)
    }
}

const getalltasks = async (req,res) => {
    try {
        const tasks = await Tasks.find()
        res.status(200).json(tasks)
        console.log("these are all: "+tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const completetask = async (req, res) => {
    try {
        const { id, completed } = req.body;

        const task = await Tasks.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = completed;
        await task.save();

        res.status(200).json({ message: `Task marked as ${completed ? 'completed' : 'pending'}` });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const updatetask = async (req, res) => {
    try {
        const { id, title, description, category, dueDate, priority } = req.body;

        const task = await Tasks.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.category = category || task.category;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;

        await task.save();

        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deletetask = async (req, res) => {
    try {
        const { id } = req.body;

        const task = await Tasks.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const serverworks = async (req,res) => {
    try {
        res.json("server works")
    } catch (error) {
        res.json(error)
    }
}

module.exports = { serverworks, createtask, getalltasks, completetask, updatetask, deletetask }