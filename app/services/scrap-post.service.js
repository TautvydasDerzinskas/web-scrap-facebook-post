// Local modules
const request = require('request')
const dynamicSettings = require('yargs').argv

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
        if (cleanData.vardadieniai && cleanData.vardadieniai.length > 0) {
          this.processNamesdays(cleanData)
        } else {
          request({ url: constants.namesdayAlternativeUrl, encoding: null }, (error, response, html) => {
            if (!error) {
              const cleanDataAlternative = formatter.extractnamesDayAlternative(html)
              this.processNamesdays(cleanDataAlternative)
            }
          })
        }
      }
    })
  }

  processNamesdays (cleanData) {
    graphicsService.generateNamesDayImage(`${cleanData.vardadieniai.join(', ')}`).then(image => {
      if (dynamicSettings.env === 'PROD') {
        facebook.postImage(
          `Šiandien vardadienį švenčia: ${cleanData.vardadieniai.join(', ')}! Sveikiname! (y) #${cleanData.vardadieniai.join(' #')}`,
          image
        ).then(() => {
          console.log('Names day post with image posted!')
        }, (error) => {
          console.log('Error while posting names day image', error)
        })
      } else {
        console.log('Names day image generated')
      }
    }, (error) => {
      console.log('Could not generate names day image', error)
    })
  }

  weatherAndCelebrations () {
    request({ url: constants.namesdayUrl, encoding: null }, (error, response, html) => {
      if (!error) {
        const cleanData = formatter.extractnamesDay(html)
        if (cleanData.sventes.length || cleanData.orai.length) {
          this.processWeatherAndCelebtrations(cleanData)
        } else {
          request({ url: constants.namesdayAlternativeUrl, encoding: null }, (error, response, html) => {
            if (!error) {
              const cleanDataAlternative = formatter.extractnamesDayAlternative(html)
              this.processWeatherAndCelebtrations(cleanDataAlternative)
            }
          })
        }
      }
    })
  }

  processWeatherAndCelebtrations (cleanData) {
    let celebrationsText = ''
    if (cleanData.sventes && cleanData.sventes.length > 0) {
      celebrationsText = ` 🌍 Ar žinojote, kad ši diena yra minima kaip: ${cleanData.sventes.join(', ')}?`
    }

    if (cleanData.orai && cleanData.orai.length > 0) {
      celebrationsText = `Šios dienos temperatūra Lietuvoje bus apie ${cleanData.orai[0]} (🌞/🌚).${celebrationsText}`
    }
    if (dynamicSettings.env === 'PROD') {
      facebook.postMessage(celebrationsText).then(() => {
        console.log('Weather & celebrations information message posted!')
      }, (error) => {
        console.log('Error while posting weather & celebrations message!', error)
      })
    } else {
      console.log('Weather & celebrations text generated:', celebrationsText)
    }
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
              if (dynamicSettings.env === 'PROD') {
                facebook.postImage(
                  `Nuotaikai pagerinti 🌞 #Anekdotas #Humoras #Juokelis`,
                  image
                ).then(() => {
                  console.log('Jokes post with image posted!')
                }, (error) => {
                  console.log('Error while posting jokes image', error)
                })
              } else {
                console.log('Joke image generated', randomJoke)
              }
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
