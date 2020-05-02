# **Start Gulp template**


## Build setup

1. Install [NodeJS](https://nodejs.org/en/);
2. Install the Gulp CLI running `npm install -g gulp-cli`. More details are available on their website https://gulpjs.com;
3. Install the NPM dependencies by running `npm install`.


## Usage
**NOTE:** _You shouldn't update package **del**. It should be **4.1.1** version._

* `npm run dev` runs your project on the local server;
* `npm run build` runs build your project;
* `npm run clean` cleans created folder (`dist/`);

> When you include library you should add to **.eslintrc.json** name it library.

> For example: you call main function of library,
```
const mySlider = new Swiper(...);
```
```
"globals": {
    "Swiper": true
},
```


## For the upload to the server
**NOTE:** _Above all you should set settings for upload on your server. (look for in `tasks/deploy/deploy-config.js`)_

* `npm run dev-deploy` runs to upload to the server and watching the changes;
* `npm run build-deploy` runs to upload to the server your project;