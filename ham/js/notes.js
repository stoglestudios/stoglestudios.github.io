// SCRIPTING NOTES FOR SCROLL FUNCTIONS

//SET INITIAL VARS
T_previous = -1;
T_current = 0;
isScrolling = false;
initialWindowPostion = null;
currentWindowPosition = null;
windowPositions = [];

on "SCROLL" event {    
    if (!isScrolling) {
        initialWindowPostion = $(document).scrollTop(); // <-- GET: CURRENT WINDOW POSTION;
        var scrollTracking = setInterval( windowScrolling, 50 );
        //SET FINAL VAR
        isScrolling = true;
    }
}

function windowScrolling () {
    if ( T_previous == 0 ) {
        windowPositions[0] = initialWindowPostion;
        windowPositions[1] = $(document).scrollTop();
    } else if ( T_previous > 0 ) {
        windowPositions[T_current] = $(document).scrollTop();
    }
    if ( windowPositions[T_current] == windowPositions[T_previous]) {
        console.log ("Scrolling Stopped ...?");
        // STOP!!
        //end tracking
        // if window delta >= 0 run menu close
        // if window delta < 0 run menu open
        //reset all vars to intial values
    } else {
        T_previous++;
        T_current++;
    }
}