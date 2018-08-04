import env from '../conf/env'
import io from 'socket.io-client'
import router from '../router/index';

let socket = io(
  `ws://${env.HOST}:${env.PORT}`,
  {
    path: env.PATH
  }
)
socket.on('connect_error', (err) => {
  console.log(err);
  alert(JSON.stringify(err))
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