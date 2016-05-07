window.addEventListener("DOMContentLoaded", function(){
    var v = document.createElement('video');
    v.autoplay = true;
    document.body.appendChild(v);
    console.log("hello");

    var hls = new Hls({
        debug: true

    });
    hls.loadSource('https://mobile.picarto.tv/hls/codl/index.m3u8');
    hls.attachMedia(v);

    window.setInterval(function(){
        document.querySelector(".spinner").innerHTML = Date();
    }, 1000);
});
