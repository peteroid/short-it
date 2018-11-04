const UUID = require('uuid/v5')
const generate = require('nanoid/generate')
const _ = require('lodash')

const DB = require('./db')

const DOMAIN = `http://peteroid.com`

function getRandomCode (length = 8) {
  return generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length)
}

function hashUrlToId (url) {
  return UUID(url, UUID.URL)
}

class Shortener {
  constructor () {
    // this._byCode = {}
    // this._urlToCode = {}
  }

  getShortUrlFromCode (code) {
    return `${DOMAIN}/${code}`
  }

  async getCode (url) {
    const urlId = hashUrlToId(url)
    const item = await DB.getUrlItem(urlId)

    const _code = _.get(item, 'code')
    if (_code) {
      return _code
    }

    // not exists, can process the shortening
    let code, codeItem
    do {
      code = getRandomCode()
      codeItem = await DB.getCodeItem(code)
    } while (codeItem)

    await Promise.all([
      DB.putUrlItem(urlId, { code, url }),
      DB.putCodeItem(code, { urlId })
    ])

    return code
  }

  async getShortUrl (_url) {
    let url = '' + _url
    if (!url.startsWith('http')) {
      url = `http://${url}`
    }

    const code = await this.getCode(url)
    return {
      url,
      shorten_url: this.getShortUrlFromCode(code)
    }
  }

  async getUrlFromCode (code) {
    if (!this._byCode[code]) return null
    const { url } = this._byCode[code]
    return url ? ('' + url) : null
  }
}

let _instance
function getShortener () {
  if (!(_instance instanceof Shortener)) {
    _instance = new Shortener()
  }
  return _instance
}

module.exports = {
  getShortener
}
