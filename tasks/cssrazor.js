/*
 * grunt-cssrazor
 * https://github.com/changer/grunt-cssrazor
 *
 * Copyright (c) 2013 Ruben Stolk
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  grunt.registerMultiTask('cssrazor', 'Produces cleaned CSS based on actually used DOM', function() {

    var done = this.async(),
        target = this.target,
        path = require('path'),
        crawl = require('crawl'),
        lodash = require('lodash'),
        options = this.options(),
        phantom = require('node-phantom-simple'),
        keys = {},
        regex = /(?:^|\})([^\{]*?)\{/g,
        css = grunt.file.read(options.input),
        parsed = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\@media[\s\S]*?\{[\s\S]*?\}/g, ''),
        rxresult,
        success = function() {
          var length = css.length;
          for(var k in keys) {
            if(keys[k] === 0) {
              // build a regex to strip out this particular rule from the original CSS
              var rx = new RegExp('(^|\\}\\s*)' + k.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + '(\\:[^\\s\\}]+)?\\s*?\\{[^\\}]*?\\}', 'g');
              css = css.replace(rx, '$1');
            }
          }
          grunt.file.write(options.output, css);
          console.log('Reduced your CSS by roughly ' + Math.round(css.length / length * 100) + '%!');
          return done();
        };

    while((rxresult = regex.exec(parsed)) !== null) {
      var key = rxresult[1].replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\:[^\s\}]+/g, '');
      keys[key] = 0;
    }

    phantom.create(function(err, ph) {
      var count = 0,
          window; // jslint
     urlArray = function() {
      var result, data = pages, length = data.length, urls = [];
      crawl.crawl('http://changer.nl', function (err, pages) {
        if (err) {
          console.log('Error!');
          return;
        }
        for(var i=0; i < length; i++) {
          urls.push(data[i].url);
        }
        result = _.uniq(urls);
      });
      console.log(result);
      return result;
     } 
      urlArray.forEach(function(url, i) {
        ph.createPage(function(err, page) {
          page.open(url, function(err, status) {
            page.evaluate(function(keys) {
              var result = [];
              for(var k in keys) {
                try {
                  if(window.document.querySelectorAll(k).length) {
                    result.push(k);
                  }
                }
                catch(e) {
                  // Usually fails because of prefixed rules (-moz- etc), so we'll have to be graceful to them
                  result.push(k);
                }
              }
              return result;
            }, function(err, result) {
              result.forEach(function(key) {
                keys[key]++;
              });
              count++;
              if(count === urlArray.length) {
                success();
              }
            }, keys);
          });
        });
      });
    });

  });

};
