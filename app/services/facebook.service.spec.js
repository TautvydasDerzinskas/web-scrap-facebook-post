const ut = require('unit.js')
const mock = require('mock-require')

mock('https', {
  request: function (config, callback) {
    // eslint-disable-next-line
    callback('Image posted')
    return { on: () => {} }
  }
})
mock('request', function (config, callback) { callback(null, 'Message posted', {}) })
mock('fs', { createReadStream: function () { } })
mock('form-data', function () {
  this.append = function () {}
  this.pipe = function () {}
  this.getHeaders = function () {}
})

const facebookService = require('./facebook.service.js')

describe('Facebook service tests', () => {
  it('Should post a message', (done) => {
    facebookService.postMessage('Sample message').then(resp => {
      ut.must(resp).be('Message posted')
      done()
    })
  })

  it('Should post a image', (done) => {
    facebookService.postImage('Sample message', 'app/image/test.png').then(resp => {
      ut.must(resp).be('Image posted')
      done()
    })
  })
})
