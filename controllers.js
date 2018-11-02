const { getShortener } = require('./Shortener')

/*
1. RESTful endpoint for url submission - POST /submit
- req: { "url": "http://www.google.com" }
- response: { "url": "http://www.google.com",
"shorten_url":"http://shorturl.com/aSxgd5ga" }
*/
async function onSubmitShortRequest (req, res) {
  const { url } = req.body
  console.log(req.body)
  if (!url) {
    res.send({
      message: 'URL is invalid'
    })
    return
  }
  const result = await getShortener().getShortUrl(url)
  res.send(result)
}

/*
2. Shorten redirect URL
- GET /[a-zA-Z0-9]{8} (regex, eg. aSxgd5ga)
- HTTP 301 to saved link (eg. ​http://www.google.com​ according
previous example)
- No update on the shorten link once created
*/
async function redirectFromCode (req, res) {
  const { code } = req.params
  const url = await getShortener().getUrlFromCode(code)
  if (!url) {
    res.send({
      message: 'no url is registered'
    })
    return
  }
  res.redirect(301, url)
}


module.exports = {
  redirectFromCode,
  onSubmitShortRequest
}
