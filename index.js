const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const router = require('./routes')

const app = express()
const port = 3000

app.use(helmet())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => console.log(`Listening on port ${port}!`))
