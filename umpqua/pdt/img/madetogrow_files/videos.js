// initialize namespace safely
var MadeToGrow = MadeToGrow || {};

/**
 * Usage of the YouTube JavaScript IFRAME API
 *
 * https://developers.google.com/youtube/iframe_api_reference
 * 
 * @return {Object}   Returns videos object on window.MadeToGrow 
 *
 */
MadeToGrow.videos = (function(win) {

    var resize = {};

    // This is the code for the background video player.
    var w = $(win).width();

    // object namespace returned publically on window.MadeToGrow
    var videos = {

        players: {},
        queue: [],
        using: [],
        counter: 0,

        playerType: {
            teaser: {
                controls: 0,
                loop: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                wmode: 'transparent'
            }
        },

        youtuber: function(id, useIframe){

            var v = videos;

            // console.log('youtuber() 003')

            var settings = {
                width: w,
                height: Math.ceil(w / (16 / 9)),
                playerVars: v.players[id].settings,
                events: {
                    'onReady': this.events.onPlayerReady,
                    'onStateChange': this.events.onPlayerStateChange
                }
            };
            // override
            if (typeof v.players[id].cb['onReady'] !== 'undefined') {
                settings.events['onReady'] = v.players[id].cb['onReady'];
            };
            // override
            if (typeof v.players[id].cb['onStateChange'] !== 'undefined') {
                settings.events['onStateChange'] = v.players[id].cb['onStateChange']
            };

            if (typeof useIframe === 'undefined') {
                settings.videoId = id;
            };
            if (v.players[id].repeating) {
                settings.playerVars.playlist = id;
            };
            // console.dir(settings);

            return new YT.Player(v.players[id].selector, settings);
        },

        // object literal 
        create: function(vid, target, initialize, looping, playerTypeSet, events){
            if (typeof events === 'undefined') {
                events = {};
            };
            var setup = {
                id: vid,
                player: (initialize) ? this.youtuber(id) : {},      // YouTube object reference
                $player: $("#" + target),                           // jquery object reference
                selector: target,
                settings: this.playerType[playerTypeSet],
                repeating: looping,
                cb: events,
                type: 'created'
            };

            return setup;
        },

        // need multiple instances
        // this is for instantiating a player
        init: function(vid, target, looping, playerType, events){
            
            // console.log('init() 001');

            if (this.events.isApiReady) {
                
                // console.debug('init() 001-a');

                this.players[vid] = this.create(vid, target, true, looping, playerType, events);

            } else {

                // console.debug('init() 001-b');

                this.queue.push( this.create(vid, target, false, looping, playerType, events) );
                this.counter++;

            };
        },

        // this is for using an existing player
        use: function(vid, target, events){
            // console.log('use');

            if (typeof events === 'undefined') {
                events = {};
            };

            if (this.events.isApiReady) {
                this.players[vid] = {
                    id: vid,
                    player: this.youtuber(vid, true),
                    selector: target,
                    type: 'using',
                    cb: events
                }
            } else {
                this.using.push( {
                    id: vid,
                    player: {},
                    selector: target,
                    type: 'using',
                    cb: events
                } );
                this.counter++;
            };

        },

        // YouTube events in a private home
        // HOWEVER, they're running in the Window scope
        events: {
            isApiReady: false,

            onYouTubeIframeAPIReady: function() {

                // console.log('002');
                // console.log('onYouTubeIframeAPIReady');

                var v = videos;

                isApiReady = true;

                if (v.counter > 0) {
                    $.each(v.queue, function(i, n){
                        videos.players[n.id] = n;
                        videos.players[n.id].player = videos.youtuber(n.id);
                    });
                    $.each(v.using, function(i, n){
                        videos.players[n.id] = n;
                        videos.players[n.id].player = videos.youtuber(n.id, true);
                    })
                };
            },
            onPlayerReady: function(event) {
                // console.count('from default onPlayerReady');
            },
            onPlayerStateChange: function(state){
                // var id = state.target.getVideoData()['video_id'];
                // console.log('onStateChange fired: ', id, state.data);
                //if (state.data === 0) {
                //    alert('done');
                //    ga("send", "event", <% Obj.title %>, <% Obj.view %>)
                //}
            }
        },

        getStates: function(){
            $.each(this.players, function(k, v){
                console.log(k, v.player.getPlayerState());
            })
        },

        getPlayerById: function(id){
            var player = false;
                player = MadeToGrow.videos.players[id].player;
            return player;
        },

        // these are safe methods to use in case the real thing doesn't exist!
        tryto: {
            // a null safe way to pauseVideo()
            pause: function(player){
                try {
                    player.pauseVideo();
                } catch (e) {  }
            },

            // a null safe way to playVideo()
            play: function(player){
                try {
                    player.playVideo();
                } catch (e) {  }
            },

            // a null safe way to seekTo
            seek: function(player, key){
                try {
                    player.seekTo(key);
                } catch (e) {  }
            },

            // toggleVideo({ mainVidDiv, fullVidDiv, mainVid, fullVid }
            toggleVideo: function(s){
                try { 
                    s.mainVidDiv.style.display = "block";
                } catch (e) {  }
                try { 
                    s.fullVidDiv.style.display = "none";
                } catch (e) {  }
                // these have their own try / catch                
                videos.tryto.pause(s.fullVid);
                videos.tryto.seek(s.mainVid, 0);
                videos.tryto.play(s.mainVid);
            }
        },

        // resize handler updates width, height and offset of player after resize/init
        resize: function(){

            // console.count('resize');

            var that = this;
            var width = $(window).width(),
                pWidth, // player width, to be defined
                height = $(window).height(),
                pHeight, // player height, tbd
                $player = $('#player');

            that.$player = $player;

            // when screen aspect ratio differs from video, video must center and underlay one dimension

            if (width / (16 / 9) < height) { // if new video height < window height (gap underneath)
                pWidth = Math.ceil(height * (16 / 9)); // get new player width
                that.$player.width(pWidth).height(height).css({
                    left: (width - pWidth) / 2,
                    top: 0
                }); // player width is greater, offset left; reset top
            } else { // new video width < window width (gap to right)
                pHeight = Math.ceil(width / (16 / 9)); // get new player height
                that.$player.width(width).height(pHeight).css({
                    left: 0,
                    top: (height - pHeight) / 2
                }); // player height is greater, offset top; reset left
            }
        }
    };

    return videos;
}(this));

var utag = document.createElement('script');
    utag.src = "https://www.youtube.com/iframe_api";

var ufirstScriptTag = document.getElementsByTagName('script')[0];
    ufirstScriptTag.parentNode.insertBefore(utag, ufirstScriptTag);

var onYouTubeIframeAPIReady = MadeToGrow.videos.events.onYouTubeIframeAPIReady;

$(window).resize(function() {
    MadeToGrow.videos.resize();
});



