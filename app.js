const signalText = document.getElementById('signal-text');

function speak(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-US';
        window.speechSynthesis.speak(msg);
    } else {
        alert('TTS not supported in this browser.');
    }
}

function buySignal() {
    signalText.innerText = '📈 BUY Signal Activated';
    speak('Buy signal activated');
}

function sellSignal() {
    signalText.innerText = '📉 SELL Signal Activated';
    speak('Sell signal activated');
}

function exitSignal() {
    signalText.innerText = '⏹ EXIT Signal Activated';
    speak('Exit signal activated');
}

setInterval(() => {
    signalText.innerText = 'Signals will appear here';
}, 10000);
