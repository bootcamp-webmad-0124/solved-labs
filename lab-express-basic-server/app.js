const express = require('express')
const logger = require('morgan')
const PORT = 5005


const app = express()

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(logger('dev'))



// ROUTES
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/home.html`)
})

app.get('/blog', (req, res) => {
    res.sendFile(`${__dirname}/views/blog.html`)
})

app.get('/api/projects', (req, res) => {
    const projectsData = require('./data/projects.json')
    res.json(projectsData)
})

app.get('/api/projects/css', (req, res) => {
    const projectsData = require('./data/projects.json').filter(elm => elm.techStack.includes('CSS'))
    res.json(projectsData)
})

app.get('/api/articles', (req, res) => {
    const articlesData = require('./data/articles.json')
    res.json(articlesData)
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => console.log('Server listening on port ' + PORT))