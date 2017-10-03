const jimp = require('jimp')

class GraphicsService {
  generateNamesDayImage (listString) {
    jimp.read('./app/images/01_background.png', (error, image) => {
      if (!error) {
        jimp.loadFont(jimp.FONT_SANS_64_BLACK).then(font => {
          image.print(
            font,
            260,
            380,
            listString,
            500
          )

          image.write('./app/images/names_day_output.png')
        })
      }
    })
  }
}

module.exports = new GraphicsService()
