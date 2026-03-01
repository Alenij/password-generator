const slider = document.getElementById("slider");
const password = document.getElementById("password");
const copied = document.getElementById("copied");
const icon = document.getElementById("copy-icon");
const character = document.getElementById("character-no");
const box = document.querySelectorAll(".box");
const indicator = document.getElementById("strength-indicator");
const bar = document.querySelectorAll(".strength-bar");
const generate = document.getElementById("generate-btn");

let result = "";

slider.addEventListener("input", () => {
  const percent = (slider.value / slider.max) * 100;
  slider.style.setProperty("--fill", `${percent}%`);
  character.innerHTML = slider.value;
});

box.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.toggle("checked");
    box.querySelector(".check-icon").classList.toggle("icon");
  });
});

generate.addEventListener("click", () => {
  let pool = "";
  result = "";

  if (document.getElementById("uppercase").classList.contains("checked")) {
    pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (document.getElementById("lowercase").classList.contains("checked")) {
    pool += "abcdefghijklmnopqrstuvwxyz";
  }
  if (document.getElementById("numbers").classList.contains("checked")) {
    pool += "0123456789";
  }
  if (document.getElementById("symbols").classList.contains("checked")) {
    pool += "!@#$%^&*";
  }

  const checkedCount = document.querySelectorAll(".box.checked").length;

  bar.forEach((b) => {
    b.style.background = "transparent";
    b.style.border = "2px solid #E6E5EA";
  });

  if (pool === "" || slider.value == 0) {
    password.textContent = "P4$5W0rD!";
    password.classList.remove("password");
    indicator.innerHTML = "";
    return;
  }

  if (checkedCount === 1) {
    bar[0].style.background = "#f64a4a";
    bar[0].style.border = "none";
    indicator.innerHTML = "TOO WEAK!";
  } else if (checkedCount === 2) {
    bar[0].style.background = "#FB7C58";
    bar[1].style.background = "#FB7C58";
    bar[0].style.border = "none";
    bar[1].style.border = "none";
    indicator.innerHTML = "WEAK";
  } else if (checkedCount === 3) {
    bar[0].style.background = "#F8CD65";
    bar[1].style.background = "#F8CD65";
    bar[2].style.background = "#F8CD65";
    bar[0].style.border = "none";
    bar[1].style.border = "none";
    bar[2].style.border = "none";
    indicator.innerHTML = "MEDIUM";
  } else if (checkedCount === 4) {
    bar[0].style.background = "#A4FFAF";
    bar[1].style.background = "#A4FFAF";
    bar[2].style.background = "#A4FFAF";
    bar[3].style.background = "#A4FFAF";
    bar[0].style.border = "none";
    bar[1].style.border = "none";
    bar[2].style.border = "none";
    bar[3].style.border = "none";
    indicator.innerHTML = "STRONG";
  }

  for (let i = 0; i < slider.value; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  password.textContent = result;
  password.classList.add("password");
});

icon.addEventListener("click", () => {
  navigator.clipboard.writeText(result);
  copied.classList.remove("hidden");
  setTimeout(() => copied.classList.add("hidden"), 2000);
});
