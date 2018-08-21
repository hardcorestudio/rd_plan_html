function gologin(){
    var currentUrl = window.location.href;
    var url = "";
    if(currentUrl.indexOf("/index.html")>0){
        url = currentUrl.split("/index.html")[0] + "/main.html#/login";
    }else{
        url = currentUrl + "main.html#/login";
    }
    window.location.href = url;
}