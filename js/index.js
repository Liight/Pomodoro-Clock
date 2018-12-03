// Helper Functions
function getElem(id) {
  return document.getElementById(id);
}

function getValue(elem) {
  return parseInt(elem.innerHTML);
}

// register variables
var bigTime; // time in seconds
var mode = "normal"; // normal vs cooldown
var color = "FFDB70";
var cooldownColor = "265E9A";
var textCoolDownColor = "#333";
var textNormalColor = "#F05A28";
var divisor = 300;
var mins;
var secs;
var countdownID;

var audio = new Audio("http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3");

function playAudio() {
  audio.play();
};

// register elements
var minutes = getElem("minutes");
var seconds = getElem("seconds");
var message = getElem("message");
var sessionTime = getValue("sesionNumber");
var breakTime = getValue("breakNumber");
// register session minus
var sessionMinus = getElem("sessionMinus");
// register session plus
var sessionPlus = getElem("sessionPlus");
// register break minus
var breakMinus = getElem("breakMinus");
// register break plus
var breakPlus = getElem("breakPlus");
// register start button
var start = getElem("start");
start.addEventListener("click", startTimer, false);
// register reset button
var reset = getElem("reset");
reset.addEventListener("click", resetTimer, false);

//Timer Elem
var minutesElem = getElem("minutes");
var secondsElem = getElem("seconds");

//Get VALUE;
var breakLength = getElem(breakTime);
var sessionLength = getElem(sessionTime);

// BREAK MINUS
breakMinus.onclick = function() {
  if (breakLength > 0) {
    breakPlus.removeAttribute("disabled");
    breakLength = breakLength - 1;
    breakNumber.innerHTML = breakLength;
  }
  if (breakLength == 0) {
    breakMinus.setAttribute("disabled", "disabled");
  }
};
// BREAK PLUS
breakPlus.onclick = function() {
  if (breakLength < 60) {
    breakMinus.removeAttribute("disabled");
    breakLength = breakLength + 1;
    breakNumber.innerHTML = breakLength;
  }
  if (breakLength === 60) {
    breakPlus.setAttribute("disabled", "disabled");
  }
};
// SESSION MINUS
sessionMinus.onclick = function() {
  if (getValue(minutesElem) > 0) {
    sessionLength = getValue(minutesElem) - 1;
    sessionNumber.innerHTML = sessionLength;

    if (sessionLength < 10) {
      minutesElem.innerHTML = "0" + sessionLength;
    } else {
      minutesElem.innerHTML = sessionLength;
    }

    secondsElem.innerHTML = "00";
  }

  if (sessionLength < 1) {
    startButton.setAttribute("disabled", "disabled");
  }
};
// SESSION PLUS
sessionPlus.onclick = function() {
  if (getValue(minutesElem) < 60) {
    sessionLength = getValue(minutesElem) + 1;
    sessionNumber.innerHTML = sessionLength;
    getElem("start").removeAttribute("disabled");

    if (sessionLength < 10) {
      minutesElem.innerHTML = "0" + sessionLength;
    } else {
      minutesElem.innerHTML = sessionLength;
    }

    secondsElem.innerHTML = "00";
  }
};

// COUNTER ================================================================
function counter(eventInfo) {
    // calculate the minutes and seconds from bigTime
    mins = Math.floor(bigTime / 60);
    secs = bigTime - mins * 60;

    // change the HTML to show new minutes and seconds
    minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
    seconds.innerHTML = (secs < 10 ? '0' : '') + secs;
    // switch modes when timer expires
    if (bigTime === 0) {
      if (mode === "normal") {
        playAudio()
          // go to cooldown
        mode = "cooldown";
        bigTime = getValue(breakNumber) * 60;
        divisor = 30;
        // change background color to cooldown
        document.body.style.background = "#" + cooldownColor;
        $("#timer").css('color', textCoolDownColor);
        $("#message").css('color', textCoolDownColor);
      } else {
        resetTimer();
      }
    } else {
      // decrement
      bigTime = bigTime - 1;
    }
  }
  // ACTIONS =============================================================
function startTimer(eventInfo) {
  $('#sessionPlus').prop('disabled', true);
  $('#sessionMinus').prop('disabled', true);
  bgColor = color;
  bigTime = getValue(sessionNumber) * 60; // get from app settings
  divisor = 300;
  // start the timer
  countdownID = setInterval(function() {
    counter();
  }, 1000);
  // show reset button
  start.style.display = "none";
  reset.style.display = "block";
}

function resetTimer(eventInfo) {
  $('#sessionPlus').prop('disabled', false);
  $('#sessionMinus').prop('disabled', false);
  // stop timer
  clearInterval(countdownID);
  running = false;
  // switch back to normal mode
  mode = "normal";
  $("#timer").css('color', textNormalColor);
  $("#message").css('color', textNormalColor);
  bigTime = getValue(sessionNumber) * 60;
  bgColor = color;
  // change styles to normal
  sessionNumber.innerHTML = "25";
  breakNumber.innerHTML = "0";
  minutes.innerHTML = "25";
  seconds.innerHTML = "00";
  document.body.style.background = "#" + color;
  // show start button
  start.style.display = "block";
  reset.style.display = "none";
  // stop timer
  clearInterval(countdownID);
}