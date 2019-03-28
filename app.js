let synth1 = null;
// frequencies used

let created = false;

$(document).ready(function(){
    console.log("welcome...");
    $("#one").hide();
    $("#nine").hide();

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

    $("#one").on({"touchstart": function() { 
        createSynth();
        touchStart(lowNoteOne, highNoteOne); 
        $(this).css("background-color", "rgb(77, 185, 113)");
        
    } });
    $("#one").on({"touchend": function() { 
        createSynth();
        touchEnd(lowNoteOne, highNoteOne); 
        $(this).css("background-color", "rgb(129, 238, 165)");
    } });
    $("#nine").on({"touchstart": function() {
        createSynth();
         touchStart(lowNoteNine, highNoteNine); 
         $(this).css("background-color", "rgb(13, 12, 32)");
    } });
    $("#nine").on({"touchend": function() { 
        createSynth();
        touchEnd(lowNoteNine, highNoteNine); 
        $(this).css("background-color", "rgb(20, 18, 56)");
    } });

    $("#starttop").click(startClick);
    $("#startbottom").click(startClick);
}

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
function touchStart(ln, hn) {
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