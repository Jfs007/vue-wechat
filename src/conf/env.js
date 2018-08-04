
let isDev = process.env.NODE_ENV === 'development';
const env = {
  // 正式
  production: {
    HOST: 'jfs.natapp1.cc',
    PORT: '',
    PATH: '/chat',
    API: ''
  },
  development: {
    HOST: '127.0.0.1',
    PORT: '3000',
    PATH: '/chat',
    API: '/api'
  }

}

export default isDev ? env.development: env.production;


