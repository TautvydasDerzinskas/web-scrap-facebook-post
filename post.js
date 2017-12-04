const dynamicSettings = require('yargs').argv
const scrapPostService = require('./app/services/scrap-post.service.js')

switch (dynamicSettings.type) {
  case 'INFO':
    scrapPostService.weatherAndCelebrations()
    break
  case 'NAMESDAY':
    scrapPostService.namesdays()
    break
  case 'JOKE':
  default:
    scrapPostService.jokes()
    break
}
