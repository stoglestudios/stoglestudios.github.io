// initialize namespace safely
var MadeToGrow = MadeToGrow || {};

/**
 * Enable parallax / on screen scrollers effects using ScrollMagic 
 * 
 * @requires Greensock plugin for Scrolling Animations
 * @requires Greensock libraries
 * @requires jQuery
 * 
 * @return {Object}   Returns scrollers object on window.MadeToGrow 
 *
 */
MadeToGrow.scrollers = (function() {

    // debug console output, on-screen indicators, etc.
    var debug = false;

    // ScrollMagic console logging verbosity 
    var config = (debug) ? { loglevel: 1 } : {};

    var threshold = 900; // threshold to run transitions on, in px
    var winWidth = $(window).width();

    // controller for any scrollers / parallax stuff on a page
    var c = new ScrollMagic.Controller(
        $.extend(config, {
            // global scene settings
            globalSceneOptions: {
                // triggerHook: 'onEnter'
                // offset: -200 // earlier
                // offset: -75 // later
                offset: -300 // none
            }
        })
    );

    var scrollers = {

        minSize: threshold,
        windowWidth: winWidth,

        controller: c,
        tweens: [],
        scenes: [],

        // global settings for fx
        // on the "fade in" fx how far does it slide?
        fadeOffset: '100px',
        // on the "fade in" fx how long will it take
        fadeTime: 1,

        // toggle on-screen debugging indicators for ScrollMagic scenes and triggers 
        setDebug: function(obj){
            if (debug) {
                return obj.addIndicators();
            } else return;
        },

        // the background slide has much different globalSceneOptions than the other
        // scenes, so it's got it's own object here
        backSlide: {
            duration: '150%',
            triggerHook: 'onEnter',
            offset: -200
        },

        /**
         * @namespace fx is for namespace for special fx
         * actual re-usable effects bits / functions / methods
         * @type {Object}
         */
        fx : {
            /**
             * Create a ScrollMagic Scene Object
             * @param  {selector|object|array} select   valid selector for ScrollMagic Scene constructor
             * @param  {TweenMax Object} tweener        valid tweenmax object
             * @return {ScrollMagic Scene Object}       Returns valid ScrollMagic.Scene
             */
            createScene: function(select, tweener, settings){
                var options = {
                        triggerElement: select
                    }
                if (typeof settings !== 'undefined') {
                    $.extend(options, settings)
                };
                // console.dir(options);
                var theScene = new ScrollMagic.Scene(options).setTween(tweener);
                scrollers.scenes.push(theScene);
                return theScene;
            },

            /**
             * Create a TweenMax.from tween animation for ScrollMagic to use
             *     - simply pass the object returned from this to the createScene() method
             *         as the "tweener" param
             * @param  {selector|object|array}  select      Valid selector for Greensock TweenMax
             *                                              this is *what* is animating
             * @param  {Boolean}                isSliding   tell the given scene to slide down as it fades
             * @param  {object}                 [settings]  (optional) object to extend the default settings.
             *                                              this would allow the caller to override *any* settings
             *                                              
             * @return {object}                             returns a Greensock TweenMax animation to pass into 
             *                                              a ScrollMagic Scene
             */
            tweenFadeIn: function(select, isSliding, settings){
                var s = scrollers;
                var options = {
                    opacity: 0
                };
                var slideOption = {
                    marginTop: s.fadeOffset
                };
                if (isSliding) {
                    $.extend(options, slideOption);
                };
                if (typeof settings !== 'undefined') {
                    $.extend(options, settings);
                };
                // console.dir(options);
                var tweener = new TweenMax.from(select, s.fadeTime, options);
                // console.dir(tweener);
                s.tweens.push(tweener);
                return tweener;
            },

            /**
             * Slide the background as the user scrolls down the page for a parallax layered sort of effect
             * @param  {selector|object|array} select Valid selector for Greensock TweenMax
             *                                        this is *what* is animating
             * @param {boolean} fromNotTo             This boolean toggles TweenMax.to to TweenMax.from
             * @return {object}                       returns a Greensock TweenMax animation to pass into a 
             *                                        ScrollMagic scene
             */
            tweenBackground: function(select, settings, fromNotTo){
                // var s = scrollers; // only if needed later
                var options = {
                    backgroundPosition: '0 -100%',
                    ease: Linear.easeNone
                }
                if (typeof settings !== 'undefined') {
                    $.extend(options, settings)
                };

                // console.log('tweenBackground options', options);

                var bgTween = {};

                if (typeof fromNotTo !== 'undefined' && fromNotTo) {
                    bgTween = new TweenMax.from(select, .5, options);
                } else {
                    bgTween = new TweenMax.to(select, .5, options);
                }; 

                // console.dir(bgTween);

                scrollers.tweens.push(bgTween);
                return bgTween;
            }
        },

        // transitions for main page
        main: {
            init: function() {
                var s = scrollers;

                // Introdution Text: Fades in with slide
                // Tween
                var introIn = s.fx.tweenFadeIn('#introContent .row', true);
                // Scene
                var introScene = s.fx.createScene('.introSection', introIn);
                // s.setDebug(introScene);

                // Podcast background
                // Tween
                var podBack = s.fx.tweenBackground('#toolsContent');
                // Scene
                var podBackScene = s.fx.createScene('#podcast', podBack, s.backSlide);
                // s.setDebug(podBackScene);

                // Phone image: fades in with slide
                // Tween
                var podBringPhoneIn = s.fx.tweenFadeIn('div.podcastImg', true);
                // Scene (with an override offset)
                var podPhoneScene = s.fx.createScene('#podcastDiv2', podBringPhoneIn, {
                    offset: 20
                });
                // s.setDebug(podPhoneScene);

                // Podcast header: fades in, no slide
                // Tween
                var podHeaderIn = s.fx.tweenFadeIn('div.innerPodcastDiv', false);
                // Scene (with an override offset)
                var podHeaderScene = s.fx.createScene('#podcastDiv1', podHeaderIn, {
                    offset: 20
                });
                // s.setDebug(podHeaderScene);

                // And Continue to Grow: fades in, no slide
                // Tween
                var continueIn = s.fx.tweenFadeIn('#storyContBody', false);
                // Scene
                var continueScene = s.fx.createScene('#storyCont', continueIn);
                // s.setDebug(continueScene);

                // How Can We Help You?: fades in, no slide
                // Tween
                var howCanIn = s.fx.tweenFadeIn('#productsContent>div', false);
                // Scene
                var howCanScene = s.fx.createScene('#productsContent', howCanIn)
                // s.setDebug(howCanScene);

                // How Can We background
                // Tween
                var howBack = s.fx.tweenBackground('#productsContent');
                // Scene
                var howBackScene = s.fx.createScene('#productsSection', howBack, s.backSlide);
                // s.setDebug(howBackScene);

                // set up all the scenes
                c.addScene([introScene, podBackScene, podPhoneScene, podHeaderScene, continueScene, howCanScene, howBackScene]);
            }
        },

        // transitions for 
        lending: {
            init: function(){
                var s = scrollers;

                console.log('running home-lending scrollers');
                var lc = new ScrollMagic.Controller(
                        $.extend(config, {
                            // global scene settings
                            globalSceneOptions: {
                                // triggerHook: 'onEnter'
                                // offset: -200 // earlier
                                // offset: -75 // later
                                offset: -300 // none
                            }
                        })
                    );

                // Introdution Text: Fades in with slide
                // Tween
                var introIn = s.fx.tweenFadeIn('#introContent .row', true);
                // Scene
                var introScene = s.fx.createScene('.introSection', introIn);
                // s.setDebug(introScene);

                // Resources background
                // Tween
                var resBackground = s.fx.tweenBackground('#toolsContent');
                // Scene
                var resBackgroundScene = s.fx.createScene('#podcast', resBackground, s.backSlide);
                // s.setDebug(resBackgroundScene);

                // Loan Booklet: fades in with slide
                // Tween
                // var loanBookIn = s.fx.tweenFadeIn('div.buyersGuideImg', true, {
                //     // this particular image has a very different margin than the others had
                //     marginTop: '250px'
                // });
                // // Scene (with an override offset)
                // var loanBookScene = s.fx.createScene('.buyersDiv', loanBookIn, {
                //     offset: 40
                // });
                // // s.setDebug(loanBookScene);
                // loanBookScene.enabled(false);

                // // Podcast header: fades in, no slide
                // // Tween
                // var loanHeaderIn = s.fx.tweenFadeIn('div.innerPodcastDiv', false);
                // // Scene (with an override offset)
                // var loanHeaderScene = s.fx.createScene('#podcastDiv1', loanHeaderIn, {
                //     offset: 50
                // });
                // // s.setDebug(loanHeaderScene);
                // loanHeaderScene.endabled(false);

                // Team Section
                // Tween
                var teamIn = s.fx.tweenFadeIn('#teamContent', false);
                var teamScene = s.fx.createScene('#teamSection', teamIn);
                // s.setDebug(teamScene);

                // set up all the scenes
                // lc.addScene([introScene, resBackgroundScene, loanBookScene, loanHeaderScene, teamScene]);
                lc.addScene([introScene, resBackgroundScene, teamScene]);
            }
        },

        // long term / personal investing / wealth management
        personal: {
            init: function(){
                var s = scrollers;

                // we have some differences here so we are going custom
                var pc = new ScrollMagic.Controller(
                        $.extend(config, {
                            // global scene settings
                            globalSceneOptions: {
                                // triggerHook: 'onEnter'
                                // offset: -200 // earlier
                                // offset: -75 // later
                                offset: -300 // none
                            }
                        })
                    );

                console.log('running personal / wealth management scrollers');

                // Introdution Text: Fades in with slide
                // Tween
                var introIn = s.fx.tweenFadeIn('#introContent .row', true);
                // Scene
                var introScene = s.fx.createScene('.introSection', introIn);
                // s.setDebug(introScene);

                // Women-led image: fades in with slide
                // Tween
                var womenIn = s.fx.tweenFadeIn('.womenLedWrapper .column img', true);
                // Scene (with an override offset)
                var womenScene = s.fx.createScene('#womenLedSection', womenIn, {
                    offset: 150
                });
                // s.setDebug(womenScene);
                // womenScene.enabled(false);

                // Women-led header: fades in, no slide
                // Tween
                var womenHeaderIn = s.fx.tweenFadeIn('.womenLedColumn', false);
                // Scene (with an override offset)
                var womenHeaderScene = s.fx.createScene('#womenLedContent', womenHeaderIn, {
                    offset: 200
                });
                // s.setDebug(womenHeaderScene);
                // womenHeaderScene.enabled(false);

                // Wealth Locations
                // Tween
                var wealthLocationPic = s.fx.tweenFadeIn('.wealthLocContainer .row', false);                
                // Scene
                var wealthLocationScene = s.fx.createScene('.wealthLocContainer', wealthLocationPic);
                // s.setDebug(wealthLocationScene);

                pc.addScene([introScene, womenScene, womenHeaderScene, wealthLocationScene]);

            }
        },

        // small business scrolls
        smallBusiness: {
            init: function(){
                var s = scrollers;

                console.log('running smallBusiness scrollers');

                // Introdution Text: Fades in with slide
                // Tween
                var introIn = s.fx.tweenFadeIn('#introContent .row', true);
                // Scene
                var introScene = s.fx.createScene('.introSection', introIn);
                // s.setDebug(introScene);

                // Grow With You Text: Fades in with slide
                // Tween
                var growIn = s.fx.tweenFadeIn('#growWithYouContent .row', true);
                // Scene
                var growScene = s.fx.createScene('#growWithYouSection', growIn);
                // s.setDebug(growScene);

                // Limited Time Specials Top Background
                // Tween
                var specialsTopIn = s.fx.tweenBackground('.topPatternDiv', {
                    backgroundPosition: '0 -70px'
                });
                // Scene
                var specialsTopScene = s.fx.createScene('#specialsSection', specialsTopIn, {
                    duration: '50%'
                });
                // s.setDebug(specialsTopScene);

                // Limited Time Specials Content
                // Tween
                var specialBlocksIn = s.fx.tweenFadeIn('div.specialsWrapper', false);
                // Scene
                var specialsScene = s.fx.createScene('.topPatternDiv', specialBlocksIn);
                // s.setDebug(specialsScene);

                // Limited Time Specials Bottom Background
                // Tween
                var specialsBotIn = s.fx.tweenBackground('.bottomPatternDiv', {
                    backgroundPosition: '0 -70px'
                }, false);
                // Scene
                var speciasBotScene = s.fx.createScene('div.specialsWrapper', specialsBotIn, {
                    duration: '50%',
                    triggerHook: 'onLeave',
                    offset: -300
                });
                // s.setDebug(speciasBotScene);

                // set up all the scenes
                c.addScene([introScene, growScene, specialsTopScene, specialsScene, speciasBotScene]);

            }
        },

        init: function(section) {

            // catch windows that are not the right size
            if (scrollers.windowWidth < scrollers.minSize) { return true; };

            if (typeof section !== 'undefined') {
                this[section].init();
            } else {
                this['main'].init();
            };

        }
    }

    return scrollers;
}());