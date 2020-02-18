const consola = require('consola')

export default function (req, res) {
  consola.debug('echo req url:',req.url)
  consola.debug('echo req body:',req.body)
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(JSON.stringify(req.body));
}
