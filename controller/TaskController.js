const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const taskLists = await Task.find()
        return res.render("index", {taskLists});
    }
    catch (err) {
        // console.log(err)
        res.status(500).send({ error: err.msg })
    }
   
}

const createTask = async (req, res) => {
    const task = req.body
    if(task.check === undefined){
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

module.exports = {
    getAllTasks,
    createTask
}