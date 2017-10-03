// Local modules
const request = require('request')

// Constants
const constants = require('../constants.js')

class Facebook {
  postMessage (message, callback) {
    const url = `${constants.facebookGraphApiUrl}${constants.facebookPageId}/feed`
    const body = `message=${encodeURIComponent(message)}&access_token=${constants.facebookAccessToken}`

    request({ url: url, method: 'POST', headers: null, body: body }, (err, response, body) => {
      if (callback) {
        if (err) {
          callback(err)
        } else {
          callback(null, body)
        }
      }
    })
  }
};

module.exports = new Facebook()
