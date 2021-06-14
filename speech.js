var synth = window.speechSynthesis;

var textform = document.querySelector('form');
console.log(textform);
var textinput = document.querySelector('#text-input');
console.log(textinput);
var voiceselect = document.querySelector('#voice-select');
console.log(voiceselect);
var rate = document.querySelector('#rate');
console.log(rate);
var ratevalue = document.querySelector('#rate-value');
console.log(ratevalue);
var pitch = document.querySelector('#pitch');
var pitchvalue = document.querySelector('#pitch-value');
console.log(pitchvalue);
const body=document.querySelector('body');


var voices = [];
function voicelist() {
    voices = synth.getVoices();

    voices.forEach(voice => {
        var option = document.createElement('option');
        option.textContent = voice.name + "(" + voice.lang + ")";

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceselect.appendChild(option);

    })

}
voicelist();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = voicelist;
}

function speak() {
    //addd gif in backgrounf
  
    if (synth.speaking) {
        console.log('Already speaking...');
    }
    if (textinput.value !== '') {
        body.style.background='#141414 url(wave.gif.gif)';
        body.style.backgroundRepeat='repeat-x'
       body.style.backgroundSize='100% 100%';
        var speaktext = new SpeechSynthesisUtterance(textinput.value);

        speaktext.onend = e => {
            console.log('Done Speaking..');
            body.style.background='#141414'
        }
        speaktext.onerror = e => {
            console.log("some error");
        }

        var selectedvoice = voiceselect.selectedOptions[0].getAttribute(
            'data-name'
        );

        voices.forEach(voice => {
            if (voice.name === selectedvoice) {
                speaktext.voice = voice;
            }
        });
       speaktext.rate=rate.value;
       speaktext.pitch=pitch.value

       synth.speak(speaktext);

    }
};

//event listners
textform.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textinput.blur();
});

rate.addEventListener('change', e => (ratevalue.textContent=rate.value));

pitch.addEventListener('change', e => (pitchvalue.textContent = pitch.value));
voiceselect.addEventListener('change', e => speak());