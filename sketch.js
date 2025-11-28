// SIMPLE EYE-FOCUSED FACIAL RECOGNITION (GLITCHY)
// Needs p5.js + clmtrackr + pModel already included in your HTML

let capture;
let ctracker;

// eye landmark indices from clmtrackr
// (same numbering you saw on your screenshot)
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
  // invert colours (like your screenshot)
  filter(INVERT);

  let positions = ctracker.getCurrentPosition();

  if (positions.length > 0) {
    // ---- 1. find eye bounding box ----
    let allEyeIndices = leftEyePoints.concat(rightEyePoints);

    // start with first eye point
    let first = positions[allEyeIndices[0]];
    let xMin = first[0];
    let xMax = first[0];
    let yMin = first[1];
    let yMax = first[1];

    // go through all eye points
    for (let i = 1; i < allEyeIndices.length; i++) {
      let p = positions[allEyeIndices[i]];
      let x = p[0];
      let y = p[1];

      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }

    // add a bit of padding around the eyes
    let padding = 8;
    xMin -= padding;
    xMax += padding;
    yMin -= padding;
    yMax += padding;

    // centre of eyes
    let eyeCX = (xMin + xMax) / 2;
    let eyeCY = (yMin + yMax) / 2;

    // ---- 2. draw shaky eye box ----
    let shakeX = random(-3, 3);
    let shakeY = random(-3, 3);

    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(xMin + shakeX, yMin + shakeY, xMax - xMin, yMax - yMin);

    // dark bar that sometimes covers the eyes (as if // dark bar that sometimes covers the eyes (as if it “loses” them)
    if (frameCount % 20 < 10) {
      noStroke();
      fill(0, 0, 0, 120);
      rect(xMin, eyeCY - 6, xMax - xMin, 12);
    }

    // ---- 3. small dots on each eye landmark ----
    noStroke();
    fill(255);
    for (let i = 0; i < allEyeIndices.length; i++) {
      let p = positions[allEyeIndices[i]];
      ellipse(p[0], p[1], 4, 4);
    }
  }

  // ---- 4. simple “broken AI” text ----
  if (frameCount % 30 === 0) {
    labelIndex = floor(random(labels.length));
  }
  let confidence = nf(random(0, 40).toFixed(2), 2, 2); // 0–40%

  fill(0, 255, 0);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("FACIAL RECOGNITION", 10, 10);
  text("Status: " + labels[labelIndex], 10, 26);
  text("Confidence: " + confidence + " %", 10, 42);
}





