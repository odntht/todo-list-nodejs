const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(process.env.DB_URI).then(() => console.log("MongDB Atlas, conectado")
    ).catch(err => console.log(err));
}

module.exports = connectToDb;