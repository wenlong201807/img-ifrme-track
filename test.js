const sendByImage = function (src, callback) {
  let image = new Image(1, 1);
  image.onload = image.onerror = function () {
    image.onload = image.onerror = null;
    image = null;
    callback && callback()
  };
  image.src = src;
}


const sendByForm = function (url, data, callback) {
  let obj = {
    tempform: document.createElement("form"),
    frameId: "kjdp_sendBrowserLog" + Math.round(Math.random() * 100),
    iframe: document.createElement("iframe")
  }
  obj.iframe.id = obj.frameId;
  obj.iframe.name = obj.frameId;
  obj.iframe.style.display = "none";
  obj.iframe.src = "about:blank";
  obj.tempform.action = url;
  obj.tempform.method = "post";
  // obj.tempform.target =obj.frameId;
  obj.tempform.style.display = "none";
  for (var attr in data) {
    obj.opt = document.createElement("input");
    obj.opt.name = attr;
    obj.opt.value = data[attr];
    obj.tempform.appendChild(obj.opt);
  }
  obj.opt = document.createElement("input");
  obj.opt.type = "submit";
  obj.tempform.appendChild(obj.opt);
  document.body.appendChild(obj.iframe);
  try {
    obj.iframe.contentWindow.document.body.appendChild(obj.tempform);
    // document.body.appendChild(); 
    obj.tempform.submit();
    obj.iframe.onload = function (data) {
      // console.log('post返回:', data);
      callback && callback(data)
      setTimeout(function () {
        obj.iframe.parentNode.removeChild(obj.iframe)
        obj = {}
      }, 10)
    }
  } catch (err) {
    console.error(err)
  }
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
