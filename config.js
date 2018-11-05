// http
const HTTP_PORT = 3000
const DOMAIN = 'http://short.it'

// aws
const AWS_REGION = 'ap-southeast-1'
const AWS_DYNAMODB_URL_TABLE = 'short-it-db'
const AWS_DYNAMODB_CODE_TABLE = 'short-it-code'

// general
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

module.exports = {
  HTTP_PORT,
  DOMAIN,

  AWS_REGION,
  AWS_DYNAMODB_URL_TABLE,

  CHARS
}
