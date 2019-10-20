// 判断浏览器及IE版本
export function checkBrowser (callMessage) {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  // var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  // var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否谷歌浏览器
  // var isEdge = userAgent.indexOf("Trident") > -1; //判断是否EDGE浏览器
  if (isIE) {
    var IE5 = IE55 = IE6 = IE7 = IE8 = false;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    IE55 = fIEVersion == 5.5;
    IE6 = fIEVersion == 6.0;
    IE7 = fIEVersion == 7.0;
    IE8 = fIEVersion == 8.0;
    if (IE55 || IE6 || IE7 || IE8) {
      callMessage()
    }
  }//isIE end
}
// 获取querystring
export function getQueryString(){
  var result = window.location.href.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+","g")); 
  var qsJson = {};
  if(result == null){
      return qsJson;
  }
  for(var i = 0; i < result.length; i++){
      var resultStr = result[i].substring(1);
      var key = subStringByBefore(resultStr);
      var value = subStringByAfter(decodeURIComponent(resultStr));
      qsJson[key] = value;
  }
  return qsJson;
}
function subStringByAfter(str) {
	var strIndex = str.indexOf("=") + 1;
  var resultStr = str.substr(strIndex, str.length);
  resultStr = resultStr.replace(/%2F/g,'/')
	return resultStr;
};
function subStringByBefore(str) {
	var strIndex = str.indexOf("=");
  var resultStr = str.substr(0, strIndex);
	return resultStr;
};
export function getWholeQueryString(){
  var result = subStringBySignAfter(window.location.href, "?")
  return result;
}
function subStringBySignAfter(str, sign) {
	var strIndex = str.indexOf(sign) + 1;
  var resultStr = str.substr(strIndex, str.length);
  resultStr = resultStr.replace(/%2F/g,'/')
	return resultStr;
};