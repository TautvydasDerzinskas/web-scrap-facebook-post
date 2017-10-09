![Latest CI build status](https://travis-ci.org/SlimDogs/web-scrap-facebook-post.svg?branch=master "Latest CI build status") [![Greenkeeper badge](https://badges.greenkeeper.io/SlimDogs/web-scrap-facebook-post.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/SlimDogs/web-scrap-facebook-post/branch/master/graph/badge.svg)](https://codecov.io/gh/SlimDogs/web-scrap-facebook-post) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Web scrap - Facebook post
Free time coding project which allows to scrap third party data (from givem websites) - convert it to a nice presented form (images) and post it to a selected facebook pages automatically.

This application may serve you as example of how to do certain things... Be aware that at the moment it's code is dedicated to scrap specific pages and present the data in specific way so if you want to use it you will have to modify both the scrapping logic and image generation logic to fit your needs.

# Features #
- Scrapping data from third party source ✅
- Generating images using scrapped data ✅
- Posting images to a facebook page as ✅
- Runing scrap/post task as cron job ✅
- Scrapping data from multiple sources ✅
- ~~Posting data to multiple facebook pages~~ 🔨
- Implementing different variantions of data presenting images ✅

## How to use it? ##
- Clone the repository
- Inside your local directory run `npm install` to install required dependencies
- Set these environment variables with your own data:
  1. `WSFP_FACEBOOK_ACCESS_TOKEN` - your Facebook access token required for posting things to your facebook pages ([How to get my Facebook access token?](https://stackoverflow.com/questions/17197970/facebook-permanent-page-access-token))
  2. `WSFP_FACEBOOK_PAGE_ID` - your Facebook page id, so application would know where to post scrapped data
- Modify `app/constants.js` file `urlToScrap` getter with your own website from which you would like to scrap data
- Modify `app/services/formatter.service.js` to update data extraction and formatting logic to fit your own source page
- Modify `app/services/graphics.service.js` to update the image generation logic
- Use `npm start` command to run the application

### Facebook pages using this application for automated content generation ###
- https://www.facebook.com/DienosVardai

