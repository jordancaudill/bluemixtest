/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var watson = require('watson-developer-cloud');

var language_translation = watson.language_translation({
  username: '7faa8b9f-3021-42fe-90ca-9be860fda71f',
  password: 'nLFy5CLSPPZ1',
  version: 'v2'
});

app.post('/translate', function (req, res) {
  var inputText = req.query.text;
  var inputLanguage;
  language_translation.identify({
    text: inputText },
    function (err, language) {
      if (err) {
          console.log('error:', err);
      }
      else {
        //this service returns a list of languages sorted by most to least likely, so we will just choose the most likely
        inputLanguage = language.languages[0].language;
        language_translation.translate({
          text: inputText, source : inputLanguage, target: 'en' },
          function (err, translation) {
            if (err) {
              console.log('error:', err);     
            }
            else {
              res.send(translation);
            }
        });
      }
  });
  
});
