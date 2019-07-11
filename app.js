let synth1 = null;
let nineDown = false;
let oneDown = false;
// frequencies used

let created = false;

$(document).ready(function(){
    console.log("welcome...");
    $("#one").hide();
    $("#nine").hide();
    $("#starttop").click(startClick);
    $("#startbottom").click(startClick);

    var context = new AudioContext();
    StartAudioContext(context, ".startbutton", function() {
        console.log("ready");
        console.log(context);
        setup();
    });
});

function setup() {
    const lowNoteOne = Tone.Frequency(Tone.Frequency.ftom(697), "midi").toNote();
    const highNoteOne =  Tone.Frequency(Tone.Frequency.ftom(1209), "midi").toNote();
    const lowNoteNine = Tone.Frequency(Tone.Frequency.ftom(852), "midi").toNote();
    const highNoteNine = Tone.Frequency(Tone.Frequency.ftom(1477), "midi").toNote();

    $("#one").on({"touchstart": function(e) { 
        createSynth();
        if (!nineDown) {
            touchStart(e, lowNoteOne, highNoteOne); 
        }
        $(this).css("background-color", "rgb(77, 185, 113)");
        oneDown = true;
    } });
    $("#one").on({"touchend": function() { 
        createSynth();
        touchEnd(lowNoteOne, highNoteOne); 
        $(this).css("background-color", "rgb(129, 238, 165)");
        oneDown = false;
    } });
    $("#nine").on({"touchstart": function(e) {
        createSynth();
        if (!oneDown) {
            touchStart(e, lowNoteNine, highNoteNine); 
        }
        $(this).css("background-color", "rgb(13, 12, 32)");
        nineDown = true;
    } });
    $("#nine").on({"touchend": function() { 
        createSynth();
        touchEnd(lowNoteNine, highNoteNine); 
        $(this).css("background-color", "rgb(20, 18, 56)");
        nineDown = false;
    } });

    $("body").on("touchmove", function(e) {
        var y = touchPosition(e).y;
        if ((nineDown && y < screen.height/2) || (oneDown && y >= screen.height/2)) {
            calculateVolume(y);
        }
    });
}
/**
 * Used for the start menu
 */
function startClick() {
    console.log("start");
    $("#one").show();
    $("#nine").show();
    $("#starttop").animate({height:0},500, function() {
        $(this).hide();
    });
    $("#startbottom").animate({top:"+=400px"},500, function() {
        $(this).hide();
        $(this).css("top", "0");
    });
}

/**
 * Is called when a touch starts
 */
function touchStart(e, ln, hn) {
    // get the touches position
    var pos = touchPosition(e);
    calculateVolume(pos.y);
    synth1.triggerAttack([ln, hn]);
    console.log("start");
}

/**
 * Is called when a touch ends
 */
function touchEnd(ln, hn) {
    synth1.triggerRelease([ln, hn]);
    console.log("end");
}

/**
 * Calculates the screen coordinates of a touch
 * @param {TouchEvent} e 
 */
function touchPosition(e) {
    // the coordinates of the touch
    var pos = { x:0, y:0 };
    pos.x = e.originalEvent.touches[0].pageX;
    pos.y = e.originalEvent.touches[0].pageY;
    return pos;
}

function calculateVolume(y) {
    // for NINE
    var height = screen.height/2;
    var amplitude = 1 - y/height;
    // for ONE
    if (y > height) {
        amplitude = 1 - ((y - height)/height);
    }
    // convert amp to dB
    var db = (20 * Math.log10(amplitude));
    synth1.volume.value = 1 + (db * 1.5);
    
    console.log(synth1.volume.value);
}

function createSynth() {
    if (!created) {
        synth1 = new Tone.PolySynth(2, Tone.Synth).toMaster();
        synth1.set("oscillator", {
            type: 'sine',
            modulationType: 'sine',
            modulationIndex: 0,
            harmonicity: 1
        });
        synth1.set("envelope", {
            attack: 0.001,
            decay: 0.01,
            sustain: 0.5,
            release: 0.3
        });
        synth1.set({"filter" : {
            "type" : "lowpass"
        }});
        created = true;
    }
}