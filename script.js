// script.js

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");
  const secretSelector = document.getElementById("secret-selector");
  const secretImg = document.getElementById("secret-img");
  const imagePicker = document.getElementById("imagePicker");
  const calculator = document.querySelector(".calculator");

  const clickSound = new Audio("click.mp3");
  const equalsSound = new Audio("equal.mp3");
  const clearSound = new Audio("clear.mp3");

  let currentInput = "";

  function playSound(type) {
    if (type === "=") equalsSound.play();
    else if (type === "C") clearSound.play();
    else clickSound.play();
  }

  function evaluateExpression() {
    if (currentInput === "8822") {
      secretSelector.style.display = "block";
    } else {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
      }
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      playSound(value);
      if (value === "C") {
        currentInput = "";
        display.value = "";
      } else if (value === "←") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      } else if (value === "=") {
        evaluateExpression();
      } else {
        currentInput += value;
        display.value = currentInput;
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
      currentInput += key;
      display.value = currentInput;
      playSound();
    } else if (key === "Enter") {
      e.preventDefault();
      playSound("=");
      evaluateExpression();
    } else if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
      playSound("←");
    } else if (key === "Escape") {
      currentInput = "";
      display.value = "";
      playSound("C");
    }
  });

  imagePicker.addEventListener("change", () => {
    const selectedValue = imagePicker.value;
    if (selectedValue) {
      const selectedImagePath = `images/${selectedValue}.jpg`;
      const img = new Image();
      img.onload = () => {
        secretImg.src = selectedImagePath;
        secretImg.style.display = "block";
        calculator.style.display = "none";
        secretSelector.style.display = "none";
      };
      img.onerror = () => {
        alert("Image could not be loaded. Please check the file exists in images folder.");
      };
      img.src = selectedImagePath;
    }
  });
});