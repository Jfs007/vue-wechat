
export function getRootOffset(obj, type) { //
  type = (type === 'left') ? 'offsetLeft' : 'offsetTop'
  let l = obj[type]; // 对应父容器的上边距
  while (obj = obj.offsetParent) {
    l += obj[type];
  }
  return l
}
