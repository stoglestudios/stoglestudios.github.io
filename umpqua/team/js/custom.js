$(document).ready(function() {
    //Add BG houses
    var bgIMG = "url(" + $("#teamSection").data("bg-image") + ")";
    if ( bgIMG.length > 5 && window.location.href.indexOf("homelending") > -1 ) {
        $("#teamSection").css({
            backgroundImage: bgIMG
        });
    }
    $(window).on("resize", function(){
        buildTeamDisplay();
    }).on("load", function(){
        buildTeamDisplay();
        $(".teamMember").on("click", function(event){
            $this = $(this);
            $(".info-holder").html("");
            $( $this.attr("data-target-holder") ).html( $this.children(".info-container").html() );
            // close all but target
            if ( $( $this.attr("data-target-holder") ).height() < 50 || !$this.hasClass("selected-person") ) {
                $( ".info-holder:not(" + $this.attr("data-target-holder") + ")" ).animate({
                    height: "0px"
                }, 200);
                var p_hgt = $( $this.attr("data-target-holder") + " p" ).height();
                var p_wdt = $( $this.attr("data-target-holder") + " p" ).width();
                var t_wdt = $( $this.attr("data-target-holder") ).width();
                console.log(p_wdt + " | " + t_wdt);
                var i_hgt = $( $this.attr("data-target-holder") + " .contact-container" ).height();
                if ( Math.ceil(p_wdt)+5 > Math.ceil(t_wdt) ) {
                    p_hgt += i_hgt;
                } else if ( i_hgt > p_hgt ) {
                    p_hgt = i_hgt;
                }
                p_hgt += 100;
                p_hgt += "px";
                console.log(p_hgt);
                $( $this.attr("data-target-holder") ).animate({
                    height: p_hgt
                }, 200);
            } else {
                $( ".info-holder" ).animate({
                    height: "0px"
                }, 200);
            }
            if ($this.hasClass("selected-person") ) {
                $this.removeClass("selected-person");
                $this.children(".tail").animate({
                    bottom: "0px",
                    opacity: "0"
                }, 200)
            } else {
                $this.addClass("selected-person");
                $this.children(".tail").animate({
                    bottom: "-13px",
                    opacity: "1"
                }, 200)
            }
            $this.siblings().removeClass("selected-person");
            $this.siblings().children(".tail").css({
                opacity: "0",
                bottom: "0"
            });
        });
    });
});

function buildTeamDisplay() {
    var team = ".teamMember";
    var x;
    var y;
    $(team).removeClass("selected-person");
    $(team).children(".tail").css({
        opacity: "0",
        bottom: "0"
    });
    $(".info-holder").remove();
    if ( $("html").width() > 899 ) {
        $(team).removeClass("one-col");
        $(team).removeClass("two-col");
        $(team).removeClass("three-col");
        $(team).addClass("four-col");
        $(team).removeClass("last-member");
        for (i=1; i<$(team).length/4+1; i++) {
            x = i*4-1;
            $(team).eq(x).addClass("last-member");
            $("#teamWidget").append("<div class='info-holder' id='info-holder" + i + "'></div>");
            $("#info-holder" + i).insertAfter("#associate" + x);
        }
        for (i=0;i<$(team).length;i++) {
            y = Math.ceil( (i+1)/4 );
            $("#associate"+i).attr( "data-target-holder", "#info-holder"+y );
        }
    } else if ( $("html").width() < 900 && $("html").width() > 649 ) {
        $(team).removeClass("one-col");
        $(team).removeClass("two-col");
        $(team).removeClass("four-col");
        $(team).addClass("three-col");
        $(team).removeClass("last-member");
        for (i=1; i<$(team).length/3+1; i++) {
            x = i*3-1;
            $(team).eq(x).addClass("last-member");
            $("#teamWidget").append("<div class='info-holder' id='info-holder" + i + "'></div>");
            $("#info-holder" + i).insertAfter("#associate" + x);
        }
        for (i=0;i<$(team).length;i++) {
            y = Math.ceil( (i+1)/3 );
            $("#associate"+i).attr( "data-target-holder", "#info-holder"+y );
        }
    }
     else if ( $("html").width() < 650  && $("html").width() > 449 ) {
        $(team).removeClass("one-col");
        $(team).removeClass("three-col");
        $(team).removeClass("four-col");
        $(team).addClass("two-col");
        $(team).removeClass("last-member");
        for (i=1; i<$(team).length/2+1; i++) {
            x = i*2-1;
            $(team).eq(x).addClass("last-member");
            $("#teamWidget").append("<div class='info-holder' id='info-holder" + i + "'></div>");
            $("#info-holder" + i).insertAfter("#associate" + x);
        }
         for (i=0;i<$(team).length;i++) {
            y = Math.ceil( (i+1)/2 );
            $("#associate"+i).attr( "data-target-holder", "#info-holder"+y );
        }
    } else {
        $(team).removeClass("two-col");
        $(team).removeClass("three-col");
        $(team).removeClass("four-col");
        $(team).addClass("one-col");
        $(team).addClass("last-member");
        for (i=0;i<$(team).length; i++) {
            $("#teamWidget").append("<div class='info-holder' id='info-holder" + i + "'></div>");
            $("#info-holder" + i).insertAfter("#associate"+i);
        }
        for (i=0;i<$(team).length;i++) {
            y = i;
            $("#associate"+i).attr( "data-target-holder", "#info-holder"+y );
        }
    }
    $(team).eq($(team).length-1).addClass("last-member");
}