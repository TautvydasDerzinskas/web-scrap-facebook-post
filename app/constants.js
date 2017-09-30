class Constants {
    get urlToScrap() {
        return 'http://www.day.lt';
    }

    get facebookPageId() {
        return process.env.WSFP_FACEBOOK_PAGE_ID;
    }

    get facebookAccessToken() {
        return process.env.WSFP_FACEBOOK_ACCESS_TOKEN;
    }

    get facebookGraphApiUrl() {
        return 'https://graph.facebook.com/v2.0/';
    }
}

module.exports = new Constants();