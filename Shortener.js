const generate = require('nanoid/generate')

const DOMAIN = `http://peteroid.com`

class Shortener {
  constructor () {
    this._byCode = {}
    this._urlToCode = {}
  }

  getShortUrlFromCode (code) {
    return `${DOMAIN}/${code}`
  }

  // TODO: connect to DB
  async getCode (url) {
    if (!this._urlToCode[url]) {
      // TODO: fix collision
      this._urlToCode[url] = generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)
    }
    return '' + this._urlToCode[url]
  }

  async getShortUrl (_url) {
    let url = '' + _url
    if (!url.startsWith('http')) {
      url = `http://${url}`
    }

    const code = await this.getCode(url)
    if (!this._byCode[code]) {
      this._byCode[code] = {
        url,
        shorten_url: this.getShortUrlFromCode(code)
      }
    }
    return this._byCode[code]
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
