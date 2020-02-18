import axios from 'axios'
import consola from 'consola'

export default function ({route, env}) {
  let now = new Date().toISOString();
  consola.debug('apiUrl', env.apiUrl);
  consola.debug('fullPath', route.fullPath);
  if (route.fullPath && !route.fullPath.startsWith("/api")) {
    consola.debug('send axios req', route.fullPath)
    return axios.post(env.apiUrl, {
      "type": "PageView",
      "properties": {
        "page": route.fullPath
      },
      "eventDate": now,
      "createdAt": now
    }).catch((error) => {
      consola.warn('Error occured while trying to send PageView to the Event API');
      consola.warn(error);
      if (error.response) {
        consola.warn(error.response.data);
      }
    });


  }
}
