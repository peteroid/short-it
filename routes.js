const express = require('express')
const router = express.Router()

const {
  redirectFromCode,
  onSubmitShortRequest
} = require('./controllers')

router.post('/submit', onSubmitShortRequest)
router.get('/:code([a-zA-Z0-9]{8})', redirectFromCode)

module.exports = router
