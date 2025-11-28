// SIMPLE EYE-FOCUSED FACIAL RECOGNITION (GLITCHY)
// Needs p5.js + clmtrackr + pModel already included in your HTML

let capture;
let ctracker;

// clmtrackr eye landmark indices
let leftEyePoints  = [23, 63, 24, 64, 25, 65, 26, 66];
let rightEyePoints = [30, 67, 31, 68, 28, 69, 29, 70];

let labels = ["Low confidence", "Unknown subject", "Error", "Re-scanning..."];
let labelIndex = 0;

function setup() {
  createCanvas(640, 480);

  // webcam
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  // face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);

  textFont("monospace");
}

function draw() {
  background(0);

  // draw webcam
  image(capture, 0, 0, width, height);
  filter(INVERT);

  // tracked points
  let positions = ctracker.getCurrentPosition();

  if (positions.length > 0) {

    // ---- 1. COLLECT EYE POINTS ----
    let allEyeIndices = leftEyePoints.concat(rightEyePoints);

    let first = positions[allEyeIndices[0]];
    let xMin = first[0];
    let xMax = first[0];
    let yMin = first[1];
    let yMax = first[1];

    // find bounding box
    for (let i = 1; i < allEyeIndices.length; i++) {
      let p = positions[allEyeIndices[i]];

      if (p[0] < xMin) xMin = p[0];
      if (p[0] > xMax) xMax = p[0];
      if (p[1] < yMin) yMin = p[1];
      if (p[1] > yMax) yMax = p[1];
    }

    // padding
    let padding = 8;
    xMin -= padding;
    xMax += padding;
    yMin -= padding;
    yMax += padding;

    // ---- 2. SHAKY EYE BOX ----
    let shakeX = random(-3, 3);
    let shakeY = random(-3, 3);

    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(xMin + shakeX, yMin + shakeY, xMax - xMin, yMax - yMin);

    // ---- 3. DARK BAR GLITCH ----
    if (frameCount % 20 < 10) {
      noStroke();
      fill(0, 0, 0, 120);
      rect(xMin, (yMin+yMax)/2 - 6, xMax - xMin, 12);
    }

    // ---- 4. EYE DOTS ----
    fill(255);
    noStroke();
    for (let i = 0; i < allEyeIndices.length; i++) {
      let p = positions[allEyeIndices[i]];
      ellipse(p[0], p[1], 4, 4);
    }
  }

  // ---- 5. SIMPLE BROKEN AI TEXT ----
  if (frameCount % 30 === 0) {
    labelIndex = floor(random(labels.length));
  }

  let confidence = nf(random(0, 40).toFixed(2), 2, 2);

  fill(0, 255, 0);
  noStroke();
  textSize(12);
  text("FACIAL RECOGNITION", 10, 10);
  text("Status: " + labels[labelIndex], 10, 26);
  text("Confidence: " + confidence + "%", 10, 42);
}






