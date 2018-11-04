const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const router = require('./routes')

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.get('*', (req, res) => {
  res.send('Welcome to Short It!')
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
