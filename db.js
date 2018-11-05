const AWS = require('aws-sdk')
const _ = require('lodash')

const {
  AWS_REGION,
  AWS_DYNAMODB_URL_TABLE,
  AWS_DYNAMODB_CODE_TABLE
} = require('./config')

const DB = new AWS.DynamoDB({
  region: AWS_REGION
})

function getCodeItem (key) {
  return new Promise((resolve, reject) => {
    DB.getItem({
      Key: {
        code: {
          S: key
        }
      },
      TableName: AWS_DYNAMODB_CODE_TABLE
    }, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      let result = null

      const urlId = _.get(data, 'Item.urlId.S')
      if (urlId) {
        console.log('[aws] get code item', urlId)
        result = { urlId }
      }
      resolve(result)
    })
  })
}

function getUrlItem (key) {
  return new Promise((resolve, reject) => {
    DB.getItem({
      Key: {
        shortId: {
          S: key
        }
      },
      TableName: AWS_DYNAMODB_URL_TABLE
    }, (err, data) => {
      if (err) {
        reject (err)
        return
      }

      let result = null

      const url = _.get(data, 'Item.url.S')
      const code = _.get(data, 'Item.code.S')
      if (url && code) {
        console.log('[aws] data', url)
        result = { url, code }
      }
      resolve(result)
    })
  })
}

function putCodeItem (key, { urlId }) {
  return new Promise((resolve, reject) => {
    DB.putItem({
      Item: {
        code: {
          S: key
        },
        urlId: {
          S: urlId
        }
      },
      TableName: AWS_DYNAMODB_CODE_TABLE
    }, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

function putUrlItem (key, { url, code }) {
  return new Promise((resolve, reject) => {
    DB.putItem({
      Item: {
        shortId: {
          S: key
        },
        url: {
          S: url
        },
        code: {
          S: code
        }
      },
      TableName: AWS_DYNAMODB_URL_TABLE
    }, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}

module.exports = {
  getUrlItem,
  getCodeItem,
  putCodeItem,
  putUrlItem
}
