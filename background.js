let alarmTone1, alarmTone2;
let timeCount1, timeCount2;
let remainingTime1, remainingTime2;
let isPaused1 = false, isPaused2 = false;
let isTimesUp1 = false, isTimesUp2 = false;
let lastTimerSeconds1 = null, lastTimerSeconds2 = null;

function timer(seconds, timerId) {
  if (timerId === 2) {
    clearInterval(timeCount2);
    isTimesUp2 = false;
    lastTimerSeconds2 = seconds;
    const then = Date.now() + seconds * 1000;
    sendMessageToPopup(seconds, `displayTimeLeft`, 2);
    sendMessageToPopup(then, `displayEndTime`, 2);

    timeCount2 = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft == 0) {
        alarm(2);
      }
      if (secondsLeft < 0) {
        clearInterval(timeCount2);
        return;
      }
      sendMessageToPopup(secondsLeft, `displayTimeLeft`, 2);
    }, 1000);
  } else {
    clearInterval(timeCount1);
    isTimesUp1 = false;
    lastTimerSeconds1 = seconds;
    const then = Date.now() + seconds * 1000;
    sendMessageToPopup(seconds, `displayTimeLeft`, 1);
    sendMessageToPopup(then, `displayEndTime`, 1);

    timeCount1 = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft == 0) {
        alarm(1);
      }
      if (secondsLeft < 0) {
        clearInterval(timeCount1);
        return;
      }
      sendMessageToPopup(secondsLeft, `displayTimeLeft`, 1);
    }, 1000);
  }
}

function alarm(timerId) {
  if (timerId === 2) {
    isTimesUp2 = true;
    // Demande à la popup de jouer le son
    sendMessageToPopup("", `playAlarm`, 2);
    sendMessageToPopup("", `disablePauseBtn`, 2);

    // Boucle le timer
    if (lastTimerSeconds2 !== null) {
      setTimeout(() => {
        timer(lastTimerSeconds2, 2);
      }, 1000);
    }
  } else {
    isTimesUp1 = true;
    sendMessageToPopup("", `playAlarm`, 1);
    sendMessageToPopup("", `disablePauseBtn`, 1);

    if (lastTimerSeconds1 !== null) {
      setTimeout(() => {
        timer(lastTimerSeconds1, 1);
      }, 1000);
    }
  }
}

function sendMessageToPopup(message, type, timerId) {
  chrome.runtime.sendMessage({
    message,
    type,
    timerId
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const timerId = msg.timerId === 2 ? 2 : 1;
  if (msg.type === "timer") {
    timer(+msg.message, timerId);
  } else if (msg.type === "PAUSE") {
    if (timerId === 2) {
      isPaused2 = true;
      remainingTime2 = msg.message;
      clearInterval(timeCount2);
    } else {
      isPaused1 = true;
      remainingTime1 = msg.message;
      clearInterval(timeCount1);
    }
  } else if (msg.type === "RESUME") {
    if (timerId === 2) {
      isPaused2 = false;
      timer(remainingTime2, 2);
    } else {
      isPaused1 = false;
      timer(remainingTime1, 1);
    }
  } else if (msg.type === "RESET") {
    if (timerId === 2) {
      isPaused2 = false;
      isTimesUp2 = false;
      clearInterval(timeCount2);
      clearInterval(alarmTone2);
      lastTimerSeconds2 = null;
    } else {
      isPaused1 = false;
      isTimesUp1 = false;
      clearInterval(timeCount1);
      clearInterval(alarmTone1);
      lastTimerSeconds1 = null;
    }
  } else if (msg.type == "initialCheck") {
    sendResponse({
      isTimesUp: timerId === 2 ? isTimesUp2 : isTimesUp1,
      isPaused: timerId === 2 ? isPaused2 : isPaused1,
      remainingTime: timerId === 2 ? remainingTime2 : remainingTime1,
    });
  }
});
