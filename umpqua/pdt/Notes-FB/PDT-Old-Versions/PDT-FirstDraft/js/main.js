$(document).ready(function () {
    $("ul.sys-admin").hide();
    $("#btnExport").attr(
        "value",
        "Export: " + $("select.export-format option:selected").text()
    );
    $("#hide").show();
    // ==> Orange Buttons, toggles 2 menus
    $("#reports-btn").on("click", function () {
        $("ul.reports").show();
        $("ul.sys-admin").hide();
        $("#sys-admin-btn").addClass("unselected");
        $("#reports-btn").removeClass("unselected");
    });
    $("#sys-admin-btn").on("click", function () {
        $("ul.reports").hide();
        $("ul.sys-admin").show();
        $("#reports-btn").addClass("unselected");
        $("#sys-admin-btn").removeClass("unselected");
    });
    // ==> Changes text on export button to reflect export option
    $("select.export-format").on("change", function () {
        $("#btnExport").attr(
            "value",
            "Export: " + $("select.export-format option:selected").text()
        );
    });
    // ==> 
    $("nav a:not(.current-report)").on("mouseover", function () {
        var $this = $(this);
        var fullHeight = $this.height() + $this.children("p").height() + 20;
        $this.parents("li").siblings().children("a").stop();
        $this.parents("li").siblings().children("a").animate({ height: "40px" }, 300);
        if ($this.height() == 40) {
            $this.delay(300).animate({ height: fullHeight + "px" }, 300);
        }
    });
    $("nav").on("mouseout", function () {
        var $this = $(this);
        $("nav a").stop();
        $("nav a").animate({ height: "40px" }, 300);
    });
    $("#hide").on("click", function () {
        $("#welcome-msg").animate({ height: "0px" }, 300, function () {
            $("#welcome-msg").hide();
            $("#welcome").show();
        });
    });
    $("#welcome").on("click", function () {
        $("#welcome-msg").show();
        $("#welcome").hide();
        var fullHeight = $("#welcome-msg h").height() + $("#welcome-msg p").height() + 30;
        $("#welcome-msg").animate({ height: fullHeight + "px" }, 300, function () {
            $("#welcome-msg").css("height", "auto");
        });
    });
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
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
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}