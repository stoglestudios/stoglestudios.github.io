$(document).ready(function() {
    //Search Field
    $(".me-asks").on("click", function(){
        var $this = $(this);
        var $target = $this.siblings(".umpqua-answers");
        if ( $target.is(":visible") ) {
            $target.hide(100);
//            if ( $(".QandA").innerWidth() > 800 ) {
//                $(".QandA-column").each(function(){
//                    $(this).css("height", "auto");
//                });
//            }
        } else {
            $(".umpqua-answers").hide(100);
            $target.show(100);
//          if ( $(".QandA").innerWidth() > 800 ) {
//              $(".QandA-column").each(function(){
//              $(this).css("height", $this.parent().height() + "px");
//              });
//          }
        }
    }); 
});


















