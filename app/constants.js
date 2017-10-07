class Constants {
  get facebookPageId () {
    return process.env.WSFP_FACEBOOK_PAGE_ID
  };

  get facebookAccessToken () {
    return process.env.WSFP_FACEBOOK_ACCESS_TOKEN
  };

  get facebookGraphUrl () {
    return 'graph.facebook.com'
  };

  get facebookApiVersion () {
    return 'v2.0'
  }

  /*
  * Pages used to scrap information
  */
  get namesdayUrl () {
    return 'http://www.day.lt'
  };
}

module.exports = new Constants()
