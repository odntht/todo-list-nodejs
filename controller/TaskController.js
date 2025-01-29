const Task = require('../models/Task')

let message = ""
let type = ""
const getAllTasks = async (req, res) => {
    try {
        setTimeout(() =>{
            message = "" 
        }, 1000)
        const taskLists = await Task.find()
        return res.render("index", {
            taskLists,
            task: null,
            taskDelete: null,
            message,
            type
        });
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
        message = "Insira um texto antes de adicionar a tarefa"
        type = "danger"
        return res.redirect('/')
    }
    try {
        message = "Tarefa criada com sucesso"
        type = "success"

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
            return res.render('index', { taskLists, task, taskDelete: null, message, type })
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id })
            return res.render('index', { taskLists, task: null, taskDelete, message, type })
        }
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }

}

const updateOneTask = async (req, res) => {
    try {
        const task = req.body
        await Task.updateOne({ _id: req.params.id }, task)
        message = "Tarefa atualizada com sucesso"
        type = "success"
        return res.redirect('/')
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }
}

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id })
        message = "Tarefa apagada com sucesso"
        type = "success"
        return res.redirect('/')
    } catch (err) {
        res.status(500).send({ error: err.msg })
    }
}

const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        task.check ? task.check = false : task.check = true
        await Task.updateOne({ _id: req.params.id }, task)
        return res.redirect("/")
    } catch (err) {
        
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,
    taskCheck
}