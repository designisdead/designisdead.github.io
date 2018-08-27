import moment from 'moment';

let config = {
  version: 'draft',
  cv: Date.now()
}

if(process.env.NODE_ENV == 'production') {
  config = {
    version: 'published',
    cv: moment().format('YYYYMMDDHHmm'), // 1 minute cache for API calls
  }
}
export default config;
