var hlsurl = chrome.extension.getURL("dist/hls.js");
var hls = document.createElement("script");
hls.src = hlsurl;

var mainurl = chrome.extension.getURL("picarte.js");
var main = document.createElement("script");
main.src = mainurl;

hls.addEventListener("load", function(){
    document.head.appendChild(main);
});
document.head.appendChild(hls);
