function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

let ifDebug = false;
let dubugIsClockRun = false;
let hrsDebug = 0;
let minDebug = 0;
let secDebug = 0;

let clockStrokeWeight = 10;
let clockArcDelicemer = clockStrokeWeight + 10;
let secDiameter = 500;
let minDiameter = secDiameter - clockStrokeWeight - clockArcDelicemer;
let hrsDiameter = minDiameter - clockStrokeWeight - clockArcDelicemer;

let secWidth = (hrsDiameter / 2) - 50;
let minWidth = (secWidth / 4) * 3;
let hrsWidth = (minWidth / 4) * 3;

let hrs = 0;
let min = 0;
let sec = 0;

function debugSwitch() {
  ifDebug = !ifDebug;
}

function debugSetClockTime(hoursValue, minutesValue, secValue) {
  hrsDebug = hoursValue;
  minDebug = minutesValue;
  secDebug = secValue;
}

function debugClockStart() {
  dubugIsClockRun = true;
}

function debugClockStop() {
  dubugIsClockRun = false;
}

let debugSec = -1;

function debugClockRun() {
  dubugIsClockRun = true;
  if (debugSec === second()) return;
  debugSec = second();
  if (secDebug === 59) {
    secDebug = 0
    if (minDebug === 59) {
      minDebug = 0
      if (hrsDebug = 23) {
        hrsDebug = 0;
      } else {
        hrsDebug++;
      }
    } else {
      minDebug++;
    }
  } else {
    secDebug++;
  }
}

function debugTime() {
  fill(255);
  noStroke();
  text(hrs + ":" + min + ":" + sec, 10, 200);
}

function draw() {
  background(10, 0, 20);
  translate(width / 2, height / 2);

  if (ifDebug) {
    if (dubugIsClockRun) debugClockRun();
    hrs = hrsDebug;
    min = minDebug;
    sec = secDebug;
    debugTime();
  } else {
    hrs = hour();
    min = minute();
    sec = second();
  }

  strokeWeight(clockStrokeWeight);
  stroke(255);

  hrs = map((hrs % 12) * 60 * 60 + min * 60 + sec, 0, 12 * 60 * 60, 0, 359);
  min = map(min * 60 + sec, 0, 60 * 60, 0, 359);
  sec = map(sec, 0, 60, 0, 359);

  // push();
  // strokeWeight(15);
  // stroke(252, 000, 092);
  // rotate(-90);
  // rotate(hrs);
  // line(0, 0, hrsWidth, 0);
  // pop();

  push();
  noFill();
  strokeWeight(4);
  stroke(252, 000, 092);
  rotate(hrs);
  triangle(-10, 0, 0, -hrsWidth, 10, 0);
  pop();

  push();
  stroke(253, 140, 011);
  rotate(-90);
  rotate(min);
  line(0, 0, minWidth, 0);
  pop();

  push();
  strokeWeight(6);
  stroke(010, 245, 174);
  rotate(-90);
  rotate(sec);
  line(0, 0, secWidth, 0);
  pop();

  ellipse(0, 0, 15);

  push();
  rotate(-90);
  noFill();
  stroke(252, 000, 092);
  if (hrs > 0)
    arc(0, 0, hrsDiameter, hrsDiameter, 0, hrs);
  stroke(253, 140, 011);
  if (min > 0)
    arc(0, 0, minDiameter, minDiameter, 0, min);
  stroke(010, 245, 174);
  if (sec > 0)
    arc(0, 0, secDiameter, secDiameter, 0, sec);
  pop();
}

let animationReverse = false;
let animationX = 0;
let animationY = 0;
