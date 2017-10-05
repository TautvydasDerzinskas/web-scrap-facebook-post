const jimp = require('jimp')

class GraphicsService {
  get randomNamesDayImage () {
    const variations = [
      { image: '01_background', font: 'font', x: 260, y: 440, width: 500 },
      { image: '02_background', font: 'red_48', x: 260, y: 410, width: 500 },
      { image: '03_background', font: 'white_56', x: 65, y: 610, width: 600 }
    ]

    return variations[Math.floor(Math.random() * variations.length)]
  }

  generateNamesDayImage (imageText) {
    return new Promise((resolve, reject) => {
      const variation = this.randomNamesDayImage

      jimp.read(`./app/images/${variation.image}.png`, (error, image) => {
        if (!error) {
          jimp.loadFont(`./app/fonts/${variation.font}.fnt`).then(font => {
            image.print(
              font,
              variation.x,
              variation.y,
              imageText.toUpperCase(),
              variation.width
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
