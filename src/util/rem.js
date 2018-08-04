// 以320px屏幕为例
const desW = 320; // 
; (function (doc, win, undefined) {
  var metaEl = document.querySelector("meta[name='viewport']");
  
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
    dpr = window.devicePixelRatio || 1,
    dpr= 1,
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (clientWidth === undefined) return;
      docEl.style.fontSize = 20 * (clientWidth / desW) + 'px';
  },
  scale = 1 / dpr;
  // metaEl.setAttribute('content', 'width=' + docEl.clientWidth*dpr + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
  if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);