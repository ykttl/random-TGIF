
var data = {
    startTime: 0,
    elapsedTime: 0,
    timeToAdd: 0,
    stopTimer: '',
    stopTGIF: '',
    isRunning: false,
};


var timer = {
    countUp: function() {
        data.stopTimer = setTimeout(function() {
            data.elapsedTime = Date.now() - data.startTime + data.timeToAdd;
            timer.countUp();
            timer.timerText();
        }, 10);
    },

    timerText: function() {
        var timerArea = document.getElementById('time');
        var elapsedTime = data.elapsedTime;
        var m = Math.floor(elapsedTime / 60000);
        var s = Math.floor(elapsedTime % 60000 / 1000);
        var ms = elapsedTime % 100;
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);

        timerArea.textContent = m + ":" + s + ":" + ms;
    },

};


var TGIF = {
    printTGIF: function() {
        var words = 'TGIF';
        var arr = words.split('');
        var count = 0;
        var result = document.getElementById('result');

        data.stopTGIF = setTimeout(function() {
            result.textContent += arr[Math.floor(Math.random() * arr.length)];
            count++
            if (count === arr.length) {
                count = 0;
            }
            if (result.textContent.endsWith('TGIF')) {
                TGIF.whenYouGetTGIF();
                return;
            }
            TGIF.printTGIF();
        }, 20);
    },

    whenYouGetTGIF: function() {
        clearTimeout(TGIF.printTGIF);
        clearTimeout(data.stopTimer);
        document.getElementById("beer").src = "img/beer.png";

        var result = document.getElementById("result");
        result.innerHTML =
            result.innerHTML.replace(/TGIF/g, '<span style="color:red">TGIF</span>');
    },

};


var buttons = {
    init: function() {
        buttons.startButton();
        buttons.stopButton();
        buttons.resetButton();
    },

    startButton: function() {
        var start = document.getElementById('start');
        start.addEventListener('click', function() {
            if (data.isRunning === true) {
                return;　 // if startButton is running, dont execute events below
            }
            data.isRunning = true;

            TGIF.printTGIF();
            data.startTime = Date.now();
            timer.countUp();

        });
    },

    stopButton: function() {
        var stop = document.getElementById('stop');
        stop.addEventListener('click', function() {
            if (data.isRunning === false) {
                return;
            }
            data.isRunning = false;
            clearTimeout(data.stopTGIF);
            clearTimeout(data.stopTimer);
            data.timeToAdd += Date.now() - data.startTime;
        })
    },

    resetButton: function() {
        var reset = document.getElementById('reset');
        reset.addEventListener('click', function() {
            data.isRunning = false;
            data.elapsedTime = 0;
            data.timeToAdd = 0;
            timer.timerText();
            document.getElementById('result').innerHTML = '';
            document.getElementById('beer').src = '';

        });
    },
};

buttons.init();
