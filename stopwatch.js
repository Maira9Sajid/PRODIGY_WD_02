document.addEventListener('DOMContentLoaded', () => {
    let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let timerRef = document.querySelector('.display-timer');
    //The line var display = document.querySelector('.display-timer'); is used to select an element from the HTML document and store a reference to it in a variable called display.
//document.querySelector(): This method is used to select the first element within the document that matches the specified CSS selector. In this case, the selector is .display-timer, which means it will select the first element with the class display-timer.
//Storing the Reference: The selected element is stored in the variable display. This variable now holds a reference to the DOM element with the class display-timer, allowing you to manipulate or interact with it using JavaScript.

    let int = null;
    let lapContainer = document.querySelector('.action');

    // Updating display timer
    function updateDisplay() {
        let h = hours < 10 ? '0' + hours : hours;
        let m = minutes < 10 ? '0' + minutes : minutes;
        let s = seconds < 10 ? '0' + seconds : seconds;
        let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
        timerRef.innerHTML = `${h}:${m}:${s}:${ms}`;
    }

    // Starting the timer
    function startTimer() {
        if (int !== null) {
            clearInterval(int);
        }
        int = setInterval(() => {
            milliseconds += 10;
            if (milliseconds == 1000) {
                milliseconds = 0;
                seconds++;
                if (seconds == 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes == 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }
            updateDisplay();
        }, 10);
    }

    // Pause Timer
    function pauseTimer() {
        clearInterval(int);
    }

    // Reset Timer
    function resetTimer() {
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
        updateDisplay();
    }

    // timer restarting
    function restartTimer() {
        resetTimer();
        startTimer();
    }

    // to record the laps 
    function recordLap() {
        let lapTime = timerRef.innerHTML;
        let lapElement = document.createElement('div');
        lapElement.className = 'btn';
        lapElement.innerHTML = `Lap: ${lapTime}`;
        lapContainer.appendChild(lapElement);
    }

    // part of code for reseting all the laps 
    function resetLaps() {
        let laps = lapContainer.querySelectorAll('.btn');
        laps.forEach(lap => {
            if (lap.id !== 'startTimer' && lap.id !== 'pauseTimer' && lap.id !== 'resetTimer' && lap.id !== 'restartTimer' && lap.id !== 'lap' && lap.id !== 'resetLap') {
                lap.remove();
            }
        });
    }

    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('restartTimer').addEventListener('click', restartTimer);
    document.getElementById('lap').addEventListener('click', recordLap);
    document.getElementById('resetLap').addEventListener('click', resetLaps);
});

