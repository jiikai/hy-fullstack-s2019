const app = require('./app'),
  http = require('http'),
  config = require('./utils/config');

const server = http.createServer(app);
server.listen(config.PORT, () =>  {
  console.log(`[http] server running on port ${config.PORT}`);
});
