function playerUpdater(channels){
    var player_num = 0;
    for(channel of channels){
        player_num++;
        make_player(player_num, channel.channel);
    }
    onlineData = [];
}

function make_player(num, channel){
    while(jwplayer().remove){
        jwplayer().remove();
    }
    var playlist_url = "https://mobile.picarto.tv/hls/" + channel + "/index.m3u8";
    var container = document.querySelector("#player_holder" + (num > 1 ? num : ""));
    container.style.display = "block";
    if(container.querySelector("video")){
        return;
    }
    var video = document.createElement("video");
    video.style.width= "100%";
    video.volume = 0;
    video.controls = true;
    var hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function(){
        container.appendChild(video);
        video.play();
    });
    hls.loadSource(playlist_url);

}

(function(){
    if(window.location.pathname.startsWith("/streampopout/")){
        var match = /^\/streampopout\/([^/]+)/.exec(window.location.pathname);
        var channel = match[1];
        window.setInterval(function(){
            make_player(1, channel);
        }, 4000);
    }
    if(window.location.pathname == "/"){
        var channel = document.querySelector(".player_username").textContent;
        window.setInterval(function(){
            if(jwplayer().remove){
                make_player(1, channel);
                mute.classList.add("icon-volume-off");
                mute.classList.remove("icon-volume-up");
            }
        }, 4000);
        var mute = document.querySelector("#player_pause_icon"); // lol
        mute.addEventListener('click', function(){
            var v = document.querySelector('video');
            v.volume = !v.volume;
            if(v.volume > 0.1){
                mute.classList.add("icon-volume-up");
                mute.classList.remove("icon-volume-off");
            }
            else {
                mute.classList.add("icon-volume-off");
                mute.classList.remove("icon-volume-up");
            }
        });
    }
})();
