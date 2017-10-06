// Local modules
const request = require('request')

// Constants
const constants = require('./app/constants.js')

// Services
const facebook = require('./app/services/facebook.service.js')
const formatter = require('./app/services/formatter.service.js')
const graphicsService = require('./app/services/graphics.service.js')
const cronJobService = require('./app/services/cron-job.service.js')

class WebScrapperFacebookPoster {
  constructor () {
    const namesDayCronJob = cronJobService.addChronJob({
      description: 'Names day posting to Lithuanian audience Facebook pages',
      timezone: 'Europe/Riga',
      days: [0, 1, 2, 3, 4, 5, 6],
      times: ['12:00'],
      job: this.scrap.bind(this)
    })
    namesDayCronJob.start()
  }

  scrap () {
    request({ url: constants.urlToScrap, encoding: null }, (error, response, html) => {
      if (!error) {
        const cleanData = formatter.stripHtml(html)
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
