$(document).ready(function () {
    $("ul.sys-admin").hide();
    $("ul.activities").hide();
    
    
    var hideWelcome = false;
    var hideWelcome = getPrefs("prefCookie");
    console.log(hideWelcome);
    
    if(hideWelcome === "true") {
        $("#welcome-msg").css("height", "0").hide();
        $("#welcome").show();
    } else {
        $("#hide").show();
    }
    $(".help-btn").show();
    
    $("#btnExport").attr(
        "value",
        "Export: " + $("select.export-format option:selected").text()
    );
    // ==> Orange Buttons, toggles 2 menus
    $("#reports-btn").on("click", function () {
        $("ul.reports").show();
        $("ul.sys-admin").hide();
        $("ul.activities").hide();
        $("#sys-admin-btn").addClass("unselected");
        $("#activities-btn").addClass("unselected");
        $("#reports-btn").removeClass("unselected");
    });
    $("#activities-btn").on("click", function () {
        $("ul.activities").show();
        $("ul.sys-admin").hide();
        $("ul.reports").hide();
        $("#sys-admin-btn").addClass("unselected");
        $("#reports-btn").addClass("unselected");
        $("#activities-btn").removeClass("unselected");
    });
    $("#sys-admin-btn").on("click", function () {
        $("ul.reports").hide();
        $("ul.activities").hide();
        $("ul.sys-admin").show();
        $("#reports-btn").addClass("unselected");
        $("#activities-btn").addClass("unselected");
        $("#sys-admin-btn").removeClass("unselected");
    });
    // ==> Changes text on export button to reflect export option
    $("select.export-format").on("change", function () {
        $("#btnExport").attr(
            "value",
            "Export: " + $("select.export-format option:selected").text()
        );
    });
    // ==> Menu Rollovers
    $("nav a:not(.current-report)").on("mouseover", function () {
        var $this = $(this);
        var fullHeight = $this.children("p").height() + 80;
        if ($this.height() === 60) {
            $this.delay(0).animate({ height: fullHeight + "px" }, 300);
        }
    });
    $("nav a").on("mouseout", function () {
        var $this = $(this);
        $this.stop();
        $this.animate({ height: "60px" }, 300);
    });
    $("#hide").on("click", function () {
        setPrefs("prefCookie", "true", 365);
        $("#welcome-msg").animate({ height: "0px" }, 300, function () {
            $("#welcome-msg").hide();
            $("#welcome").show();
        });
    });
    $("#welcome").on("click", function () {
        setPrefs("prefCookie", "false", 365);
        $("#welcome-msg").show();
        $("#hide").show();
        $("#welcome").hide();
        var fullHeight = $("#welcome-msg h").height() + $("#welcome-msg p").height() + 30;
        $("#welcome-msg").animate({ height: fullHeight + "px" }, 300, function () {
            $("#welcome-msg").css("height", "auto");
        });
    });
    $(".help-btn").on("click", function () {
        var elementHeight = $(".help-box a").height()
                            + 10
                            + $(".help-box h3").height()
                            + $(".help-box p").height()
                            + 20;
        $(".help-box").animate({ height: elementHeight + "px" }, 300);
        $(this).hide();
    });
    $(".help-close-btn").on("click", function () {
        $(".help-box").animate({ height: "0px" }, 300, function () {
            $(".help-btn").show();
        });
        
    });
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === '13') {
            console.log('You pressed "enter"');
            $("#btnSubmit").click();
        }
    });
    $("#btnSubmit").on("click", function () {
        console.log("Form submitted!");
    });
});

/*
Notes:

*/
function setPrefs(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getPrefs(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}