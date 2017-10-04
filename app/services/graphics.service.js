const jimp = require('jimp')

class GraphicsService {
  generateNamesDayImage (imageText) {
    return new Promise((resolve, reject) => {
      jimp.read('./app/images/01_background.png', (error, image) => {
        if (!error) {
          jimp.loadFont('./app/fonts/font.fnt').then(font => {
            image.print(
              font,
              260,
              380,
              imageText,
              500
            )

            image.write('./app/images/names_day_output.png', (error) => {
              if (error) {
                reject(error)
              } else {
                resolve({ success: true })
              }
            })
          })
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = new GraphicsService()
