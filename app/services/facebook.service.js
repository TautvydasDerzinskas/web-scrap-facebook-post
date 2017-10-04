// Local modules
const request = require('request')
const https = require('https')
const fs = require('fs')
const FormData = require('form-data')

// Constants
const constants = require('../constants.js')

class Facebook {
  postMessage (message) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://${constants.facebookGraphUrl}/${constants.facebookApiVersion}/${constants.facebookPageId}/feed`,
        method: 'POST',
        headers: null,
        body: `message=${encodeURIComponent(message)}&access_token=${constants.facebookAccessToken}`
      }, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
  }

  postImage (message, imageName) {
    return new Promise((resolve, reject) => {
      const form = new FormData()
      form.append('file', fs.createReadStream(`./app/images/${imageName}`))
      form.append('message', message)

      const request = https.request({
        method: 'post',
        host: constants.facebookGraphUrl,
        path: `/${constants.facebookPageId}/photos?access_token=${constants.facebookAccessToken}`,
        headers: form.getHeaders()
      }, (response) => {
        resolve(response)
      })

      form.pipe(request)

      request.on('error', (error) => { reject(error) })
    })
  }
};

module.exports = new Facebook()
