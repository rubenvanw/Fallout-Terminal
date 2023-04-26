/* !@#$%^&*()_+=:;'[]{}?/>.*-\| */

let characters = ["!", "@", "#", "$", "&", "^", "&", "*", "(", ")", "_", "+", "=", ":", ";", "[", "]", "{", "}", "?", "/", ">", ".", "*", "-", "|"];
let randomCharacters = "";
// let words = ["SEA", "SUN", "GUN", "GAS", "AGE", "APE", "BEE", "BOB", "BUG", "GYM", "GUY", "GUT"];
// let words = ["JUMPY", "JUNKY", "JIMMY", "JIFFY", "JANKY", "JACKS", "JOCKS", "BANJO", "BEZZEL", "BLITZ", "BLAZE", "DIZZY", "DOOZY", "DJINN", "EJECT", "GLAZE", "GLITZ", "GAZED", "KNACK", "KNICK", "KNOCK", "PLUCK", "PROXY", "PASTE", "VEXED", "VIXEN", "VIRGE", "CHIMP", "CODEX", "CODER", "COLOR", "COXED"];
let words = ["BUZZ", "FUZZ", "MUZZ", "FIZZ", "WAZZ", "JACK", "JOCK", "JUMP", "JOKE", "JIVE", "BACK", "BUMP", "BEAR", "BORE", "BOAR"];
let terminalRow = document.querySelectorAll(".terminalRow");
let output = document.querySelector(".output");
let attempts = 4;
let likeness = 0;

// sounds
let keyPress = new Audio("sounds/ui_hacking_charsingle_01.wav");
let enterSound = new Audio("sounds/ui_hacking_charenter_01.wav");
let powerOn = new Audio("sounds/poweron.mp3");
let powerOff = new Audio("sounds/poweroff.mp3");

window.onload = generator();

function generator() {
  for (x = 0; x < terminalRow.length; x++) {
    for (y = 0; y < 9; y++) {

      let random = Math.floor(Math.random() * characters.length);
      randomCharacters += characters[random];
      let span = document.createElement("span");
      span.innerHTML = randomCharacters[y];
      terminalRow[x].appendChild(span);
    }

    let spanElements = terminalRow[x].getElementsByTagName("span");
    let random2 = Math.floor(Math.random() * spanElements.length);
    let random3 = Math.floor(Math.random() * words.length);
    spanElements[random2].innerHTML = words[random3];

    randomCharacters = "";
  }
}

document.addEventListener("keydown", enter);

let random4 = Math.floor(Math.random() * words.length);

function enter(e) {
  keyPress.play();
  if (e.key == "Enter") {

    enterSound.play();
    let inputValue = document.getElementById("input").value;
    let inputValueUpper = inputValue.toUpperCase();
    console.log(words[random4]);
    console.log(inputValueUpper);

    for (c = 0; c < words[random4].length; c++) {
      if (words[random4][c] == inputValueUpper[c]) {

        likeness++;
        console.log(likeness);
      }
    }

    /*  right answer */
    if (inputValueUpper == words[random4]) {

      let match = document.createElement("p");
      let match2 = document.createElement("p");
      let match3 = document.createElement("p");
      let match4 = document.createElement("p");

      match.innerHTML = ">EXACT MATCH";
      match2.innerHTML = ">PLEASE WAIT";
      match3.innerHTML = ">WHILE SYSTEM";
      match4.innerHTML = ">IS ACCESSED";

      output.appendChild(match);
      output.appendChild(match2)
      output.appendChild(match3)
      output.appendChild(match4)

      powerOn.play();

      setTimeout(function () {
        window.location.href = "login.html";
      }, 3000);

      /* wrong answer */
    } else {

      attempts--;
      let outputRow = document.createElement("p");
      let outputRowLikeness = document.createElement("p");
      let outputRowAttempts = document.createElement("p");

      outputRow.innerHTML = ">ENTRY DENIED";
      outputRowLikeness.innerHTML = ">LIKENESS=" + likeness;
      outputRowAttempts.innerHTML = ">ATTEMPTS LEFT=" + attempts;

      output.appendChild(outputRow);
      output.appendChild(outputRowLikeness);
      output.appendChild(outputRowAttempts);

      likeness = 0

      if (attempts == 0) {
        attempts++;
        powerOff.play();
        setTimeout(function () {
          window.location.href = "locked.html";
        }, 3000);
      }
    }
  }
}
