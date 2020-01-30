import axios from 'axios'

export default function ({route}) {
  let now = new Date().toISOString();
  return axios.post('https://webhook.site/cf0dfd39-a69a-41df-9640-dc5da9ae9c42', {
    "type": "PageView",
    "properties": {
      "page": route.fullPath
    },
    "eventDate": now,
    "createdAt": now
  })
}
