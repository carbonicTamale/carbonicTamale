var path = require('path');
var GITHUB_CLIENT_ID = null;
var GITHUB_CLIENT_SECRET = null;
var GITHUB_CALLBACK = null;
var port = null;
if (process.env.NODE_ENV === 'PRODUCTION') {
  console.log("Running in production mode");
  port = 80;
  GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  GITHUB_CALLBACK = process.env.GITHUB_CALLBACK;
}
else {
  console.log("Running in development mode");
  port = 3000;
  GITHUB_CLIENT_ID = "d0b04d2cb29e8b37e9e2";
  GITHUB_CLIENT_SECRET = "bd67fd2c36a65060716d37373303cb8b02651fd9";
  GITHUB_CALLBACK = "http://dvorakop.local:3000/auth/github/callback";
}

module.exports = {
  public: path.join(__dirname, '../public'),
  port: port,
  GITHUB_CLIENT_ID: GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK: GITHUB_CALLBACK
};
