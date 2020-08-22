"use strict";
const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const resetBtn = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSave");
canvas.width = 700;
canvas.height = 700;
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
const DEFAULTCOLOR = "#2c2c2c";

let drawing = false;
let filling = false;

context.strokeStyle = DEFAULTCOLOR;
context.fillStyle = DEFAULTCOLOR;
context.lineWidth = 2.5;

function handlerMousemove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!drawing) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function stopDrawing() {
  drawing = false;
}

function startDrawing() {
  drawing = true;
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function changeColor(event) {
  const thisColor = event.target.style.backgroundColor;
  context.strokeStyle = thisColor;
  context.fillStyle = thisColor;
}

function changeRangeInput(event) {
  const currentValue = event.target.value;
  context.lineWidth = currentValue;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleClickResetBtn() {
  const nowColor = context.fillStyle;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = nowColor;
}

function handleCM(event) {
  event.preventDefault();
}

function handleClickSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", handlerMousemove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("contextmenu", handleCM);
}
if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColor)
  );
}
if (range) {
  range.addEventListener("input", changeRangeInput);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleClickResetBtn);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleClickSave);
}
