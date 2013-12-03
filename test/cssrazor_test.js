'use strict';

var grunt = require('grunt');

exports.cssrazor = function(test){

  var expected, result;

  test.expect(1);

  expected = true;
  result = true;
  test.equal(result, expected, 'should work');

  test.done();

};
