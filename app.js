const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { HTTP_PORT } = require('./config')
const router = require('./routes')

const app = express()
const port = HTTP_PORT

if (process.env.NODE_ENV === 'development') {
  console.log('[app] running on development')
} else {
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
