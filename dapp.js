const scheme = "yuhudapp://"
const browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息 
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// 加载网页
function loadURL(url) {
  var iFrame;
  iFrame = document.createElement("iframe");
  iFrame.setAttribute("src", url);
  iFrame.setAttribute("style", "display:none;");
  iFrame.setAttribute("height", "0px");
  iFrame.setAttribute("width", "0px");
  iFrame.setAttribute("frameborder", "0");
  document.body.appendChild(iFrame);
  // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
  iFrame.parentNode.removeChild(iFrame);
  iFrame = null;
}

/**
 * js call ios function name
 * @param {String} action 
 * @param {String} params 
 */
function jsCallIosAction(action, params) {
  var str = ""
  var k = 0
  var url = ""
  if (params) {
    for (let i in params) {
      k++
      str += k === 1 ? `${params[i]}` : `&${params[i]}`
    }
    url = scheme + action + "?" + str
  } else {
    url = scheme + action
  }
  loadURL(url)
}

// 判断设备 
function isIOS() {
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    // ios
    return true
  } else if (browser.versions.android) {
    // android
    return false
  }
}

function jsCallAndroidAction(apiName, options) {
  switch (apiName) {
    case "getBalance":
      // TODO
      window.android.androidCallback(apiName, options.address)
      break
    case "sendTransaction":
      // TODO
      window.android.androidCallback(apiName, `${options.from}&${options.to}&${options.value}`)
      break
    case "closeDapp":
      // TODO
      window.android.androidCallback(apiName, "")
      break
    case "goBack":
      // TODO
      window.android.androidCallback(apiName, "")
      break
    case "reload":
      // TODO
      window.android.androidCallback(apiName, "")
      break
    case "alert":
      // TODO
      window.android.androidCallback(apiName, options.message)
      break
    case "confirm":
      // TODO
      window.android.androidCallback(apiName, `${options.title}&${options.message}&${options.cancelText}&${options.confirmText}`)
      break
    case "setClipboard":
      // TODO
      window.android.androidCallback(apiName, options.message)
      break
    case "scanQRCode":
      // TODO
      window.android.androidCallback(apiName, "")
      break
    case "showAccountSwitch":
      // TODO
      window.android.androidCallback(apiName, "")
      break
  }
}

/**
 * dapp call api
 * @param {String} apiName 
 * @param {Object} options
 */
function callAPI(apiName, options) {
  switch (apiName) {
    case "transaction.getBalance":
      if (isIOS()) {
        jsCallIosAction("getBalance", options)
      } else {
        jsCallAndroidAction("getBalance", options)
      }
      break
    case "transaction.sendTransaction":
      if (isIOS()) {
        jsCallIosAction("sendTransaction", options)
      } else {
        jsCallAndroidAction("sendTransaction", options)
      }
      break
    case "navigator.closeDapp":
      if (isIOS()) {
        jsCallIosAction("closeDapp")
      } else {
        jsCallAndroidAction("closeDapp")
      }
      break
    case "navigator.goBack":
      if (isIOS()) {
        jsCallIosAction("goBack")
      } else {
        jsCallAndroidAction("goBack")
      }
      break
    case "navigator.reload":
      if (isIOS()) {
        jsCallIosAction("reload")
      } else {
        jsCallAndroidAction("reload")
      }
      break
    case "navtive.alert":
      if (isIOS()) {
        jsCallIosAction("alert", options)
      } else {
        jsCallAndroidAction("alert", options)
      }
      break
    case "navtive.confirm":
      if (isIOS()) {
        jsCallIosAction("confirm", options)
      } else {
        jsCallAndroidAction("confirm", options)
      }
      break
    case "navtive.setClipboard":
      if (isIOS()) {
        jsCallIosAction("setClipboard", options)
      } else {
        jsCallAndroidAction("setClipboard", options)
      }
      break
    case "navtive.scanQRCode":
      if (isIOS()) {
        jsCallIosAction("scanQRCode")
      } else {
        jsCallAndroidAction("scanQRCode")
      }
      break
    case "user.showAccountSwitch":
      if (isIOS()) {
        jsCallIosAction("showAccountSwitch")
      } else {
        jsCallAndroidAction("showAccountSwitch")
      }
      break
  }
}

let Yuhu = {
  callAPI: callAPI
}