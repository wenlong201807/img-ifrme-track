const sendByImage = function (src, callback) {
  console.log(url, callback);
}


const sendByForm = function (url, data, callback) {
  console.log(url, data, callback);
}

function initMixin(fn) {
  fn.prototype._init = function () {
    console.log('init...');
    window.trackPageView = this.trackPageView.bind(this);

    const urlIframe = 'http://localhost:3007/iframe-post';
    const urlImg = 'http://localhost:3007/img?aa=66&bb=88';
    sendByImage(urlImg, () => {
      console.log('发送img请求-get')
    })

    const params = {
      name: 7788,
      id: 3
    }
    sendByForm(urlIframe, params, (data) => {
      console.log('发送ifrmae-from-input请求-post', data)
    })
  };
  fn.prototype.trackPageView = function () {
    console.log('trackPageView...');
  };
}



(function (global) {
  function Tracker() {
    return this._init();
  }

  // 挂载初始化方法
  initMixin(Tracker);

  // 暴露 __YESAUTO__TRACKER__ 到全局，
  // 方便在线上环境对 SDK 的运行时进行调试
  // global.__YESAUTO__TRACKER__ = Tracker();
  global.__YESAUTO__TRACKER__ = new Tracker();
})(window);
