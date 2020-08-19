"use strict";
const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = 700;
canvas.height = 700;

let drawing = false;

context.strokeStyle = "#2c2c2c";
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
}

function changeColor(event) {
  const thisColor = event.target.style.backgroundColor;
  context.strokeStyle = thisColor;
}

function changeRangeInput(event) {
  const currentValue = event.target.value;
  context.lineWidth = currentValue;
}

function init() {
  canvas.addEventListener("mousemove", handlerMousemove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColor)
  );
  range.addEventListener("input", changeRangeInput);
}

init();
