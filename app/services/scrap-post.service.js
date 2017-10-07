// Local modules
const request = require('request')

// Constants
const constants = require('../constants.js')

// Services
const facebook = require('./facebook.service.js')
const formatter = require('./formatter.service.js')
const graphicsService = require('./graphics.service.js')

class WebScrapperFacebookPoster {
  namesdays () {
    request({ url: constants.namesdayUrl, encoding: null }, (error, response, html) => {
      if (!error) {
        const cleanData = formatter.extractnamesDay(html)
        graphicsService.generateNamesDayImage(`${cleanData.vardadieniai.join(', ')}`).then(() => {
          facebook.postImage(
            `Šiandien vardadienį švenčia: ${cleanData.vardadieniai.join(', ')}! Sveikiname! (y)`,
            'names_day_output.png'
          ).then(() => {
            console.log('Names day post with image posted!')
          }, (error) => {
            console.log('Error while posting names day image', error)
          })
        }, (error) => {
          console.log('Could not generate names day image', error)
        })
      }
    })
  }
}

module.exports = new WebScrapperFacebookPoster()
