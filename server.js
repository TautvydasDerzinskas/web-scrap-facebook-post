// Local modules
const request = require('request');

// Constants
const constants = require('./app/constants.js');

// Services
const facebook = require('./app/services/facebook.service.js');
const formatter = require('./app/services/formatter.service.js');

class WebScrapperFacebookPoster {
    constructor() { this.scrap(); }

    scrap() {
        request({ url: constants.urlToScrap, encoding: null }, (error, response, html) => {
            if (!error) {
                const cleanData = formatter.stripHtml(html);
                facebook.post(`STT: ${cleanData.vardadieniai.join(',')}`);
            }
        });
    }
}

module.exports = new WebScrapperFacebookPoster();