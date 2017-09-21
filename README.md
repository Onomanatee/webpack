# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible. For Vue 1.x use this command: `vue init webpack#1.0 my-project`

## Changes in this fork

This fork has a few small changes from the original, to allow multi-page applications. The original vue-webpack-boilerplate only works on SPAs, whereas I wanted to use it as well in a multi-page templating projecting. I'm using .ejs to compile these templates, and wanted the flexibility of injecting different vue apps into different pages.

### Using multiple html pages

To allow this boilerplate to compile your templates and add the correct compiled scripts and styles, you need to add following configuration in the **config/index.js** file:

```
module.exports = {
  entries: [
    {
      name: 'app',
      path: './src/main.js'
    }
  ],
  pages: [
    {
      name: 'index.html',
      path: path.resolve(__dirname, '../src/templates/index.ejs'),
      chunks: ['app']
    }
  ],
  build: {
   // the regular vue-webpack-boilerplate configuration
  }
}
```

As you can see, the entries and pages arrays are new additions in this fork. The entries array allows you to specify multiple entry points for your app, in case you want to create several compiled javascript bundles for optimization or divide your project in several smaller apps/modules.

The pages array contains objects for each of your desired pages/templates. The name property defines the intended output name, the path points to an .ejs template file (which can use imports to keep your templates nice and DRY), and a chunks array. The chunks array contains one or several strings, equal to the 'name' attributes in the entries object. The compiled results (both styles and scripts) of each of these entries will be injected into the page.

## Documentation

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
