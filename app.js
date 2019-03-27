let synth1 = null;
// frequencies used
const lowNoteOne = Tone.Frequency(Tone.Frequency.ftom(697), "midi").toNote();
const highNoteOne =  Tone.Frequency(Tone.Frequency.ftom(1209), "midi").toNote();
const lowNoteNine = Tone.Frequency(Tone.Frequency.ftom(852), "midi").toNote();
const highNoteNine = Tone.Frequency(Tone.Frequency.ftom(1477), "midi").toNote();

$(document).ready(function(){
    createSynth();
    $("#one").on({"touchstart": function() { 
        touchStart(lowNoteOne, highNoteOne); 
        $(this).css("background-color", "rgb(77, 185, 113)");
    } });
    $("#one").on({"touchend": function() { 
        touchEnd(lowNoteOne, highNoteOne); 
        $(this).css("background-color", "rgb(129, 238, 165)");
    } });
    $("#nine").on({"touchstart": function() {
         touchStart(lowNoteNine, highNoteNine); 
         $(this).css("background-color", "rgb(13, 12, 32)");
    } });
    $("#nine").on({"touchend": function() { 
        touchEnd(lowNoteNine, highNoteNine); 
        $(this).css("background-color", "rgb(20, 18, 56)");
    } });
});

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
}