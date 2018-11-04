const UUID = require('uuid/v5')
const generate = require('nanoid/generate')
const _ = require('lodash')

const DB = require('./db')
const { DOMAIN, CHARS } = require('./config')

function getRandomCode (length = 8) {
  return generate(CHARS, length)
}

function hashUrlToId (url) {
  return UUID(url, UUID.URL)
}

class Shortener {
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
    const item = await DB.getCodeItem(code)
    if (!item) return null

    const { urlId } = item
    const urlItem = await DB.getUrlItem(urlId)
    if (!urlItem) return null

    const { url } = urlItem
    return url
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
