import env from '../conf/env'
import io from 'socket.io-client'
import router from '../router/index';
const chat_conf_env = process.env.NODE_ENV === 'development' ? env.development : env.production;
let socket = io(
  `ws://${chat_conf_env.HOST}:${chat_conf_env.PORT}`,
  {
    path: chat_conf_env.PATH
  }
)
socket.on('connect_error', (err) => {
  console.log(err)
})
// socket.on('connect', (connect) => {
//   console.log('%c%s', 'color: greenyellow', 'online-----')
// })
let socketEmit = (event, info) => {
  info = Object.assign({
    token: localStorage.getItem('_token')
  }, info);
  return new Promise((resolve, reject) => {
    socket.emit(event, info, (rs) =>  {
      let code = rs.code;
      // 无误
      if(code === 0) {
        resolve(rs);
      }else {
        if(code === 1001) localStorage.clear('_token')
        reject(rs);
      }
    });
  })
}

export { socket, socketEmit }