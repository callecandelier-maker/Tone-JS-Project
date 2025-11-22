// Skapa synth med "fastest" latency
const synth = new Tone.Synth({
  envelope: { attack: 0.01 } // snabb attack för direkt ljud
}).toDestination();

// Flagga så AudioContext startas endast en gång
let audioStarted = false;

// Funktion som spelar tonen
async function playTone() {
  if (!audioStarted) {
    await Tone.start(); // starta AudioContext efter användarinteraktion

    // Förladda synthen med en extremt kort ton
    synth.triggerAttackRelease("C4", "0.001");

    audioStarted = true;
  }

  // Spela riktiga tonen
  synth.triggerAttackRelease("C4", "8n");
}

// Hämta knappen
const playButton = document.getElementById("play");
playButton.addEventListener("click", playTone);

// Tillägg för snabbare ljudrespons (minskar latency)
Tone.context.latencyHint = "interactive";
Tone.context.lookAhead = 0;
