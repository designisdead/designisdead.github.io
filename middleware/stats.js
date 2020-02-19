import axios from 'axios'
import consola from 'consola'

export default function (context) {
  const {route, env} = context;
  let now = new Date().toISOString();
  consola.debug('apiUrl', env.apiUrl);
  consola.debug('fullPath', route.fullPath);
  if (route.fullPath && !route.fullPath.startsWith("/api") && !route.fullPath.startsWith("/healthcheck")) {
    consola.debug('send axios req', route.fullPath);
    //When sending from server we want to override the user agent and user ip
    let config = {};
    if (process.server) {
      const {req} = context;
      config.headers = {
        'User-Agent': req.headers['user-agent']
      };
      if (req.headers['x-forwarded-for']) {
        consola.info('Found X-Forwarded-For header, passing along value: ', req.headers['x-forwarded-for']);
        config.headers['X-Forwarded-For'] = req.headers['x-forwarded-for']
      }
    }

    return axios.post(env.apiUrl, {
      "type": "PageView",
      "properties": {
        "page": route.fullPath
      },
      "eventDate": now,
      "createdAt": now
    }, config).catch((error) => {
      consola.warn('Error occured while trying to send PageView to the Event API');
      consola.warn(error);
      if (error.response) {
        consola.warn(error.response.data);
      }
    });
  }
}
