// Local modules
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

class ExtractGoodInfo {
  extractnamesDay (body) {
    body = iconv.decode(body, 'windows-1257')
    const $ = cheerio.load(body)
    const extractedData = {};

    ['vardadieniai', 'sventes'].forEach(className => {
      if (!extractedData[className]) {
        extractedData[className] = []
      }

      $(`.${className}`).filter(function () {
        const data = $(this)
        data.children().map((i, element) => {
          if (element.type === 'tag' && element.name === 'a') {
            extractedData[className].push(element.children[0].data)
          }
        })
      })
    })

    return extractedData
  }
}

module.exports = new ExtractGoodInfo()
