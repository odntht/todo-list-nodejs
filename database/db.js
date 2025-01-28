const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://root:admin@todolist.mffze.mongodb.net/?retryWrites=true&w=majority&appName=TodoList"
    ).then(() => console.log("MongDB Atlas, conectado")
    ).catch(err => console.log(err));
}

module.exports = connectToDb;