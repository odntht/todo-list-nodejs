const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const taskLists = await Task.find()
        return res.render("index", { taskLists, task: null, taskDelete: null });
    }
    catch (err) {
        res.status(500).send({ error: err.msg })
    }
}

const createTask = async (req, res) => {
    const task = req.body
    if (task.check === undefined) {
        task.check = false
    }
    if (!task.task) {
        return res.redirect('/')
    }
    try {
        await Task.create(task)
        return res.redirect('/')
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.msg })
    }

}

const getById = async (req, res) => {
    try {
        const taskLists = await Task.find()
        if (req.params.method == 'update') {
            const task = await Task.findOne({ _id: req.params.id })
            return res.render('index', { taskLists, task, taskDelete: null })
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id })
            return res.render('index', { taskLists, task: null, taskDelete })
        }
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }

}

const updateOneTask = async (req, res) => {
    try {
        const task = req.body
        await Task.updateOne({ _id: req.params.id }, task)
        return res.redirect('/')
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }
}

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id })
        return res.redirect('/')
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask
}