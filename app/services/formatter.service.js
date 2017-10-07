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

  extractJokesMaxPage (body) {
    const $ = cheerio.load(body)
    const pages = $('.pagination').children('a')
    const lastPage = pages[(pages.length - 2)]
    return lastPage.children[0].data
  }

  extractJokes (body) {
    body = iconv.decode(body, 'utf-8')
    const $ = cheerio.load(body)

    const jokes = []
    $('.box').filter(function () {
      const data = $(this)
      data.children().map((i, element) => {
        if (element.type === 'tag' && element.name === 'p') {
          let jokeText = ''
          element.children.forEach(subElement => {
            if (subElement.type === 'text') {
              jokeText += subElement.data
            }
          })
          jokes.push(jokeText.trim())
        }
      })
    })

    return jokes
  }
}

module.exports = new ExtractGoodInfo()
