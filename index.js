const express = require('express')
const app = express()

// ROTA
app.get('/home', (req, res) => {
    res.send('Hello world!')
})

app.listen(3000)