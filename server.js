const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
require('dotenv').config()

const taskController = require('./controller/task.controller')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// This is your "database" of API keys
const apiKeys = new Set();
apiKeys.add('1234567890'); // Add your API keys here

app.use((req, res, next) => {
    const apiKey = req.get('X-API-KEY');
    if (apiKeys.has(apiKey)) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get("/api/tasks", (req, res) => {
    taskController.getTasks().then(data => res.json(data))
})

app.get("/api/task/:id", (req, res) => {
    taskController.getTasksById(req.params.id).then(data => res.json(data))
})

app.post("/api/task", (req, res) => {
    console.log(req.body);
    taskController.createTask(req.body.task).then(data => res.json(data))
})

app.put("/api/task", (req, res) => {
    taskController.updateTask(req.body.task).then(data => res.json(data))
})

app.delete("/api/task/:id", (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json())
})

app.get("/", (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
})

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})
