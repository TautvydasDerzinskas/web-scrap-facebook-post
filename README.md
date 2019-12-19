<p align="center">
  <a href="https://github.com/SlimDogs/web-scrap-facebook-post"><img src="https://github.com/SlimDogs/web-scrap-facebook-post/blob/master/docs/assets/logo.png?raw=true" alt="Web scrap -> Facebook" width="300px"></a>
  <br>
  <br>
</p>

<p align="center">
  <a href="#" target="_blank"><img src="https://travis-ci.com/TautvydasDerzinskas/web-scrap-facebook-post.svg?branch=master" alt="Latest CI build status" title="Latest CI build status"></a>
  <a href="https://codecov.io/gh/SlimDogs/web-scrap-facebook-post" target="_blank"><img src="https://codecov.io/gh/SlimDogs/web-scrap-facebook-post/branch/master/graph/badge.svg" alt="Code coverage" title="Code coverage"></a>
  <a href="https://greenkeeper.io" target="_blank"><img src="https://badges.greenkeeper.io/TautvydasDerzinskas/web-scrap-facebook-post.svg" alt="Greenkeeper" title="Greenkeeper"></a>
  <a href="https://standardjs.com" target="_blank"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide" title="Standard - JavaScript Style Guide"></a>
  <a href="http://commitizen.github.io/cz-cli" target="_blank"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly" title="Commitizen friendly"></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" title="MIT License"></a>
</p>

## Table of content
- [About](#about)
- [Features](#features)
- [Usage](#usage)
- [Facebook pages demo](#demo)

## About
`web-scrap-facebook-post`

Free time coding project which allows to scrap third party data (from givem websites) - convert it to a nice presented form (images) and post it to a selected facebook pages automatically.

This application may serve you as example of how to do certain things... Be aware that at the moment it's code is dedicated to scrap specific pages and present the data in specific way so if you want to use it you will have to modify both the scrapping logic and image generation logic to fit your needs.

## Features
- Scrapping data from third party source ✅
- Generating images using scrapped data ✅
- Posting images to a facebook page as ✅
- Runing scrap/post task as cron job ✅
- Scrapping data from multiple sources ✅
- ~~Posting data to multiple facebook pages~~ 🔨
- Implementing different variantions of data presenting images ✅

## Usage
- Clone the repository
- Inside your local directory run `npm install` to install required dependencies
- Set these environment variables with your own data:
  1. `WSFP_FACEBOOK_ACCESS_TOKEN` - your Facebook access token required for posting things to your facebook pages ([How to get my Facebook access token?](https://stackoverflow.com/questions/17197970/facebook-permanent-page-access-token))
  2. `WSFP_FACEBOOK_PAGE_ID` - your Facebook page id, so application would know where to post scrapped data

  You can do that by creating `.env` file in projects root directory & populating it like this:
  ```
  WSFP_FACEBOOK_PAGE_ID=<value>
  WSFP_FACEBOOK_ACCESS_TOKEN=<value>
  ```
- Modify `app/constants.js` file `urlToScrap` getter with your own website from which you would like to scrap data
- Modify `app/services/formatter.service.js` to update data extraction and formatting logic to fit your own source page
- Modify `app/services/graphics.service.js` to update the image generation logic
- Use `npm start` command to run the application

## Demo
- https://www.facebook.com/DienosVardai

