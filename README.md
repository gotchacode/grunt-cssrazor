# grunt-cssrazor

Removes unused CSS by actually analyzing the pages that consume the CSS using Phantom

## Getting Started

Install this grunt plugin by running this command in root of your project,

```bash
npm install grunt-cssrazor
```
Then add this line to your project's `Gruntfile.js`.

```javascript
grunt.loadNpmTasks('grunt-cssrazor');
```

## Documentation

Configure task in `Gruntfile.js`,

```javascript
cssrazor: {
  release: {
    options: {
      urls: [
        'http://www.changer.nl/',
        'http://www.changer.nl/team.html',
        'http://www.changer.nl/products.html',
        'http://www.changer.nl/contact.html',
        'http://www.changer.nl/portfolio.html',
        'http://www.changer.nl/legal/'
      ],
      input: 'app.css',
      output: 'release.css'
    }
  }
}
```

This instructs `cssrazor` to process source file `app.css` and store processed file into `release.css`.

Make sure you specify all unique url's that could possibly consume your CSS to make sure you don't remove used rules.

It's advisable to run grunt-contrib-cssmin after this task to make sure your CSS is optimized for production.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Initially released on 3 december 2013

## License
Copyright (c) 2013 Ruben Stolk
Licensed under the MIT license.

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started
