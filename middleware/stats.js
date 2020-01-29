import axios from 'axios'

export default function ({ route }) {
  return axios.post('https://webhook.site/cf0dfd39-a69a-41df-9640-dc5da9ae9c42', {
   "anonymousId": "",
   "type": "PageView",
   "properties": {
  	"page": "/more-testing",
     "url": route.fullPath
   },
   "eventDate": "2019-10-09T14:45:45.100Z",
   "createdAt": "2019-10-09T14:45:45.100Z"
  })
}
