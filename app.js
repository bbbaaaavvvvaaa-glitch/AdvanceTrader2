const signalText = document.getElementById('signal-text');

// TTS function
function speak(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-US';
        window.speechSynthesis.speak(msg);
    }
}

// Sound alert
const alertSound = new Audio('alert.mp3'); // Add alert.mp3 in root folder
function playSound() {
    alertSound.play();
}

// Simulated Market Data (Demo)
let marketData = {
    price: 1000,
    highStrong: 1020,
    lowStrong: 980,
    trend4H: 'up',
    trend1H: 'up',
    demandZone: {low: 995, high: 1005},
    supplyZone: {low: 1015, high: 1025},
    liquidityZones: ['high', 'low']
};

// Smart Money + Reversal Entry Logic
function checkSmartSignal(data){
    // Multi-Timeframe Trend
    if(data.trend4H === 'up' && data.trend1H === 'up'){
        // Reversal Buy at Demand Zone
        if(data.price >= data.demandZone.low && data.price <= data.demandZone.high){
            return 'BUY';
        }
        // Continuation Sell at Liquidity Grab above High
        if(data.price > data.highStrong){
            return 'SELL';
        }
    }
    if(data.trend4H === 'down' && data.trend1H === 'down'){
        // Reversal Sell at Supply Zone
        if(data.price >= data.supplyZone.low && data.price <= data.supplyZone.high){
            return 'SELL';
        }
        // Continuation Buy at Liquidity Grab below Low
        if(data.price < data.lowStrong){
            return 'BUY';
        }
    }
    // Random CHoCH / BOS simulation for demo
    const rand = Math.random();
    if(rand < 0.2) return 'BUY';
    if(rand < 0.4) return 'SELL';
    if(rand < 0.6) return 'EXIT';
    return 'HOLD';
}

// SL/TP Calculation
function calculateSLTP(signal, data){
    let SL, TP;
    if(signal === 'BUY'){
        SL = data.demandZone.low - 5;
        TP = data.supplyZone.high;
    } else if(signal === 'SELL'){
        SL = data.supplyZone.high + 5;
        TP = data.demandZone.low;
    }
    return {SL, TP};
}

// Signal functions
function buySignal(){
    const {SL, TP} = calculateSLTP('BUY', marketData);
    signalText.innerText = `📈 BUY Signal\nSL: ${SL} TP: ${TP}`;
    speak('Buy signal activated');
    playSound();
}
function sellSignal(){
    const {SL, TP} = calculateSLTP('SELL', marketData);
    signalText.innerText = `📉 SELL Signal\nSL: ${SL} TP: ${TP}`;
    speak('Sell signal activated');
    playSound();
}
function exitSignal(){
    signalText.innerText = '⏹ EXIT Signal Activated';
    speak('Exit signal activated');
    playSound();
}

// Auto-update signals every 15 sec (simulate 15M chart)
function updateSignals(){
    const signal = checkSmartSignal(marketData);
    if(signal === 'BUY') buySignal();
    else if(signal === 'SELL') sellSignal();
    else if(signal === 'EXIT') exitSignal();
    else signalText.innerText = 'Signals will appear here';
}

setInterval(updateSignals, 15000);
