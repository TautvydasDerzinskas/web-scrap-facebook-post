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
        graphicsService.generateNamesDayImage(`${cleanData.vardadieniai.join(', ')}`).then(image => {
          facebook.postImage(
            `Šiandien vardadienį švenčia: ${cleanData.vardadieniai.join(', ')}! Sveikiname! (y)`,
            image
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

  weatherAndCelebrations () {
    request({ url: constants.namesdayUrl, encoding: null }, (error, response, html) => {
      if (!error) {
        const cleanData = formatter.extractnamesDay(html)
        let celebrationsText = ''
        if (cleanData.sventes && cleanData.sventes.length > 0) {
          celebrationsText = ` 🌍 Ar žinojote, kad ši diena yra minima kaip: ${cleanData.sventes.join(', ')}?`
        }
        facebook.postMessage(
          `🌤️ Šios dienos temperatūra Lietuvoje bus maždaug - ${cleanData.orai[0].split(',').join(' (dieną/naktį),')}.${celebrationsText}`
        ).then(() => {
          console.log('Weather & celebrations information message posted!')
        }, (error) => {
          console.log('Error while posting weather & celebrations message!', error)
        })
      }
    })
  }

  jokes () {
    request({ url: constants.jokesUrl, encoding: null }, (error, response, html) => {
      if (!error) {
        const maxPage = formatter.extractJokesMaxPage(html)
        const randomPage = Math.floor(Math.random() * maxPage) + 1

        request({ url: `${constants.jokesUrl}/${randomPage}`, encoding: null }, (error, response, html) => {
          if (!error) {
            const jokes = formatter.extractJokes(html)
            const randomJoke = Math.floor(Math.random() * jokes.length)

            graphicsService.generateJokeImage(jokes[randomJoke]).then(image => {
              facebook.postImage(
                `Nuotaikai pagerinti 🌞`,
                image
              ).then(() => {
                console.log('Jokes post with image posted!')
              }, (error) => {
                console.log('Error while posting jokes image', error)
              })
            }, (error) => {
              console.log('Could not generate jokes image', error)
            })
          }
        })
      }
    })
  }
}

module.exports = new WebScrapperFacebookPoster()
