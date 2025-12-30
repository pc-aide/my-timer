const timeInput = document.getElementById("timeInput");
const pauseBetweenLoop = document.getElementById("pauseBetweenLoop");
const timeLeftDisplay = document.getElementById("time-left");
const loopCountDisplay = document.getElementById("loop-count");
const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");

let timerSeconds = 0;
let timerInterval = null;
let loopCount = 0;
let isPaused = false;
let isRunning = false;
let remainingSeconds = 0;

// Ajoute l'audio pour le son d'alarme
const loopAlarm = new Audio("carol_of_the_bells-alarm.mp3");

function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timeLeftDisplay.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  document.title = timeLeftDisplay.textContent;
}

function resetAll() {
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;
  isRunning = false;
  remainingSeconds = 0;
  loopCount = 0;
  timeLeftDisplay.textContent = "0:00";
  loopCountDisplay.textContent = `N: ${loopCount}`;
  startBtn.textContent = "START";
}

function startTimer(seconds) {
  remainingSeconds = seconds;
  displayTimeLeft(remainingSeconds);

  function tick() {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      displayTimeLeft(remainingSeconds);
    } else {
      clearInterval(timerInterval);
      loopCount++;
      loopCountDisplay.textContent = `N: ${loopCount}`;
      // Joue le son à chaque fin de loop
      loopAlarm.currentTime = 0;
      loopAlarm.play();
      if (pauseBetweenLoop.checked) {
        isRunning = false;
        startBtn.textContent = "START";
      } else {
        remainingSeconds = timerSeconds;
        displayTimeLeft(remainingSeconds);
        timerInterval = setInterval(tick, 1000); // Utilise la fonction nommée
      }
    }
  }

  clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

function parseTimeInput(value) {
  // Accepte soit un nombre entier (minutes), soit un nombre décimal (min.sec)
  value = value.replace(',', '.'); // Remplace les virgules par des points
  const parts = value.split('.');
  
  if (parts.length === 1) {
    // Format: entier seulement (minutes)
    return parseInt(parts[0], 10) * 60;
  } else if (parts.length === 2) {
    // Format: entier.décimal (min.sec)
    const minutes = parseInt(parts[0], 10) || 0;
    
    // Convertit correctement les secondes selon leur position décimale
    let seconds = parts[1];
    if (seconds.length === 1) {
      seconds = parseInt(seconds, 10) * 10; // 0.5 = 50 secondes
    } else {
      seconds = parseInt(seconds, 10);
      if (seconds > 59) seconds = 59; // Limite à 59 secondes
    }
    
    return (minutes * 60) + seconds;
  }
  
  return 0; // Valeur par défaut en cas d'erreur
}

// Modifie les fonctions qui utilisent les inputs
function startLoopingTimer() {
  const inputValue = timeInput.value;
  if (!inputValue) {
    alert("Please enter a valid time.");
    return;
  }
  
  const seconds = parseTimeInput(inputValue);
  if (seconds <= 0) {
    alert("Please enter a valid time.");
    return;
  }
  
  timerSeconds = seconds;
  loopCount = 0;
  loopCountDisplay.textContent = `N: ${loopCount}`;
  remainingSeconds = timerSeconds;
  startBtn.textContent = "PAUSE";
  isRunning = true;
  isPaused = false;
  clearInterval(timerInterval);
  startTimer(remainingSeconds);
}

// Gestion de la touche "Enter" sur les inputs
timeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    startLoopingTimer();
  }
});

startBtn.addEventListener("click", function () {
  if (!isRunning) {
    if (!isPaused) {
      const inputValue = timeInput.value;
      if (!inputValue) {
        alert("Please enter a valid time.");
        return;
      }
      
      const seconds = parseTimeInput(inputValue);
      if (seconds <= 0) {
        alert("Please enter a valid time.");
        return;
      }
      
      timerSeconds = seconds;
      
      if (!pauseBetweenLoop.checked) {
        loopCount = 0;
        loopCountDisplay.textContent = `N: ${loopCount}`;
      }
      remainingSeconds = timerSeconds;
    }
    
    startBtn.textContent = "PAUSE";
    isRunning = true;
    isPaused = false;
    clearInterval(timerInterval);
    startTimer(remainingSeconds);
  } else {
    clearInterval(timerInterval);
    isPaused = true;
    isRunning = false;
    startBtn.textContent = "RESUME";
  }
});

clearBtn.textContent = "RESET";

clearBtn.addEventListener("click", function () {
  resetAll();
  timeInput.value = "";
});

// TIMER 2
const timeInput2 = document.getElementById("timeInput2");
const pauseBetweenLoop2 = document.getElementById("pauseBetweenLoop2");
const timeLeftDisplay2 = document.getElementById("time-left-2");
const loopCountDisplay2 = document.getElementById("loop-count-2");
const startBtn2 = document.getElementById("startBtn2");
const clearBtn2 = document.getElementById("clearBtn2");

let timerSeconds2 = 0;
let timerInterval2 = null;
let loopCount2 = 0;
let isPaused2 = false;
let isRunning2 = false;
let remainingSeconds2 = 0;

// Ajoute l'audio pour le son d'alarme du timer 2
const loopAlarm2 = new Audio("carol_of_the_bells-alarm.mp3");

function displayTimeLeft2(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  timeLeftDisplay2.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  document.title = timeLeftDisplay2.textContent;
}

function resetAll2() {
  clearInterval(timerInterval2);
  timerInterval2 = null;
  isPaused2 = false;
  isRunning2 = false;
  remainingSeconds2 = 0;
  loopCount2 = 0;
  timeLeftDisplay2.textContent = "0:00";
  loopCountDisplay2.textContent = `N: ${loopCount2}`;
  startBtn2.textContent = "START";
}

function startTimer2(seconds) {
  remainingSeconds2 = seconds;
  displayTimeLeft2(remainingSeconds2);

  function tick2() {
    if (remainingSeconds2 > 0) {
      remainingSeconds2--;
      displayTimeLeft2(remainingSeconds2);
    } else {
      clearInterval(timerInterval2);
      loopCount2++;
      loopCountDisplay2.textContent = `N: ${loopCount2}`;
      loopAlarm2.currentTime = 0;
      loopAlarm2.play();
      if (pauseBetweenLoop2.checked) {
        isRunning2 = false;
        startBtn2.textContent = "START";
      } else {
        remainingSeconds2 = timerSeconds2;
        displayTimeLeft2(remainingSeconds2);
        timerInterval2 = setInterval(tick2, 1000);
      }
    }
  }

  clearInterval(timerInterval2);
  timerInterval2 = setInterval(tick2, 1000);
}

function parseTimeInput(value) {
  // Accepte soit un nombre entier (minutes), soit un nombre décimal (min.sec)
  value = value.replace(',', '.'); // Remplace les virgules par des points
  const parts = value.split('.');
  
  if (parts.length === 1) {
    // Format: entier seulement (minutes)
    return parseInt(parts[0], 10) * 60;
  } else if (parts.length === 2) {
    // Format: entier.décimal (min.sec)
    const minutes = parseInt(parts[0], 10) || 0;
    
    // Convertit correctement les secondes selon leur position décimale
    let seconds = parts[1];
    if (seconds.length === 1) {
      seconds = parseInt(seconds, 10) * 10; // 0.5 = 50 secondes
    } else {
      seconds = parseInt(seconds, 10);
      if (seconds > 59) seconds = 59; // Limite à 59 secondes
    }
    
    return (minutes * 60) + seconds;
  }
  
  return 0; // Valeur par défaut en cas d'erreur
}

// Modifie également la fonction pour le second timer
function startLoopingTimer2() {
  const inputValue = timeInput2.value;
  if (!inputValue) {
    alert("Please enter a valid time.");
    return;
  }
  
  const seconds = parseTimeInput(inputValue);
  if (seconds <= 0) {
    alert("Please enter a valid time.");
    return;
  }
  
  timerSeconds2 = seconds;
  loopCount2 = 0;
  loopCountDisplay2.textContent = `N: ${loopCount2}`;
  remainingSeconds2 = timerSeconds2;
  startBtn2.textContent = "PAUSE";
  isRunning2 = true;
  isPaused2 = false;
  clearInterval(timerInterval2);
  startTimer2(remainingSeconds2);
}

// Mettre à jour les gestionnaires d'événements
timeInput2.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    startLoopingTimer2();
  }
});

startBtn2.addEventListener("click", function () {
  if (!isRunning2) {
    if (!isPaused2) {
      const inputValue = timeInput2.value;
      if (!inputValue) {
        alert("Please enter a valid time.");
        return;
      }
      
      const seconds = parseTimeInput(inputValue);
      if (seconds <= 0) {
        alert("Please enter a valid time.");
        return;
      }
      
      timerSeconds2 = seconds;
      
      if (!pauseBetweenLoop2.checked) {
        loopCount2 = 0;
        loopCountDisplay2.textContent = `N: ${loopCount2}`;
      }
      remainingSeconds2 = timerSeconds2;
    }
    
    startBtn2.textContent = "PAUSE";
    isRunning2 = true;
    isPaused2 = false;
    clearInterval(timerInterval2);
    startTimer2(remainingSeconds2);
  } else {
    clearInterval(timerInterval2);
    isPaused2 = true;
    isRunning2 = false;
    startBtn2.textContent = "RESUME";
  }
});

clearBtn2.textContent = "RESET";

clearBtn2.addEventListener("click", function () {
  resetAll2();
  timeInput2.value = "";
});

// Ajoute ce listener pour jouer le son à la demande du background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "playAlarm" && msg.timerId === 1) {
    loopAlarm.currentTime = 0;
    loopAlarm.play();
  }
  if (msg.type === "playAlarm" && msg.timerId === 2) {
    loopAlarm2.currentTime = 0;
    loopAlarm2.play();
  }
  // ...garde les autres traitements éventuels...
});

// Shortcut clavier pour timer 2 : S pour start/pause, T pour reset
document.addEventListener("keydown", function (e) {
  // Timer 1 shortcut: Space
  if ((e.code === "Space" || e.key === " ") && !e.repeat) {
    // Si le focus n'est pas sur un input, ou si l'input n'est pas de type text/number
    const active = document.activeElement;
    if (
      active.tagName !== "INPUT" ||
      (active.type !== "text" && active.type !== "number")
    ) {
      e.preventDefault();
      startBtn.click();
    }
  }
  // Timer 1 shortcut: R
  if ((e.key === "r" || e.key === "R") && !e.repeat) {
    e.preventDefault();
    clearBtn.click();
  }
  // Timer 2 shortcut: S
  if ((e.key === "s" || e.key === "S") && !e.repeat) {
    e.preventDefault();
    startBtn2.click();
  }
  // Timer 2 shortcut: T
  if ((e.key === "t" || e.key === "T") && !e.repeat) {
    e.preventDefault();
    clearBtn2.click();
  }
});

resetAll();
resetAll2();
