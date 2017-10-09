const cronJobService = require('./app/services/cron-job.service.js')
const scrapPostService = require('./app/services/scrap-post.service.js')

const namesDayCronJob = cronJobService.addChronJob({
  description: 'Vardadieniai (namesday) scrap & post',
  timezone: 'Europe/Riga',
  days: [0, 1, 2, 3, 4, 5, 6],
  times: ['12:00'],
  job: scrapPostService.namesdays.bind(scrapPostService)
})
namesDayCronJob.start()

const jokesCronJob = cronJobService.addChronJob({
  description: 'Joke scrap & post',
  timezone: 'Europe/Riga',
  days: [0, 1, 2, 3, 4, 5, 6],
  times: ['15:00', '19:00'],
  job: scrapPostService.jokes.bind(scrapPostService)
})
jokesCronJob.start()

const weatherAndCelebrationsCronJob = cronJobService.addChronJob({
  description: 'Weather & celebrations scrap & post',
  timezone: 'Europe/Riga',
  days: [0, 1, 2, 3, 4, 5, 6],
  times: ['09:00'],
  job: scrapPostService.weatherAndCelebrations.bind(scrapPostService)
})
weatherAndCelebrationsCronJob.start()
