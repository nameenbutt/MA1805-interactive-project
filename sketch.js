// Simple facial-recognition "error" animation
// Using p5.js in sketch.js
// Concept: systems misidentify people of colour, especially women,
// so the "AI" gets more errors when the face is darker.

// Position + size of the face
let faceX, faceY;
let faceSize = 260;

// Glitch + label variables
let labels = [
  "Scanning...",
  "Low confidence",
  "Unknown subject",
  "Error: face not found",
  "Re-scanning...",
  "Match not in database"
];

let labelIndex = 0;
let confidence = 0;
let glitchAmount = 0;

// Represents biased dataset: 0 = lighter skin, 1 = darker skin
let biasMode = 0;

function setup() {
  createCanvas(600, 400);
  faceX = width / 2;
  faceY = height / 2;

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Start with some random values
  confidence = random(60, 99);
  labelIndex = 0;
}

function draw() {
  background(5);

  // Slight scan-line effect
  drawScanLines();

  // Draw "camera frame" / UI
  drawFrameUI();

  // Decide how broken the system is, based on biasMode
  // If biasMode === 0 -> lighter skin -> higher confidence, fewer glitches
  // If biasMode === 1 -> darker skin -> lower confidence, more errors
  if (biasMode === 0) {
    confidence = lerp(confidence, random(85, 99), 0.02);
    glitchAmount = lerp(glitchAmount, 2, 0.05);
  } else {
    confidence = lerp(confidence, random(15, 60), 0.02);
    glitchAmount = lerp(glitchAmount, 15, 0.05);
  }

  // Randomly change labels over time (like unstable predictions)
  if (frameCount % 45 === 0) {
    if (biasMode === 0) {
      // mostly confident / ok labels
      labelIndex = random() < 0.7 ? 0 : floor(random(labels.length));
    } else {
      // mostly error / low confidence labels
      labelIndex = floor(random(labels.length));
    }
  }

  // Draw the face with some jitter / glitch
  push();
  translate(faceX, faceY);

  // Small random offset for glitch feel (stronger when biased)
  let jitterX = random(-glitchAmount, glitchAmount);
  let jitterY = random(-glitchAmount, glitchAmount);
  translate(jitterX, jitterY);

  drawFace();
  pop();

  // Draw extra glitch rectangles (more when biased)
  drawGlitches();

  // Draw the changing "AI" text + confidence
  drawOverlayText();
}

function drawFace() {
  noStroke();

  // Choose skin tone based on biasMode
  let skinTone;
  if (biasMode === 0) {
    // lighter
    skinTone = color(245, 210, 180);
  } else {
    // darker
    skinTone = color(120, 80, 50);
  }

  // Head
  fill(skinTone);
  ellipse(0, 0, faceSize, faceSize * 1.2);

  // Neck
  rect(0, faceSize * 0.55, faceSize * 0.3, faceSize * 0.4, 20);

  // Shoulders
  fill(40);
  rect(0, faceSize * 0.95, faceSize * 0.9, faceSize * 0.35, 50);

  // Eyes
  let eyeOffsetX = faceSize * 0.22;
  let eyeY = -faceSize * 0.1;
  let eyeW = faceSize * 0.22;
  let eyeH = faceSize * 0.13;

  // Eye whites
  fill(240);
  ellipse(-eyeOffsetX, eyeY, eyeW, eyeH);
  ellipse(+eyeOffsetX, eyeY, eyeW, eyeH);

  // Pupils (slight misalignment when biased to show "tracking" issues)
  let pupilOffset = biasMode === 0 ? 0 : random(-4, 4);
  fill(20);
  ellipse(-eyeOffsetX + pupilOffset, eyeY, eyeW * 0.25, eyeH * 0.5);
  ellipse(+eyeOffsetX + pupilOffset, eyeY, eyeW * 0.25, eyeH * 0.5);

  // Brows
  stroke(20);
  strokeWeight(4);
  let browY = eyeY - eyeH * 0.8;
  line(-eyeOffsetX - eyeW * 0.3, browY, -eyeOffsetX + eyeW * 0.3, browY);
  line(+eyeOffsetX - eyeW * 0.3, browY - 2, +eyeOffsetX + eyeW * 0.3, browY - 2);

  // Nose
  noFill();
  stroke(30);
  strokeWeight(3);
  beginShape();
  vertex(0, eyeY);
  vertex(0, eyeY + eyeH * 1.1);
  vertex(-eyeW * 0.1, eyeY + eyeH * 1.4);
  endShape();

  // Mouth (more unstable when biased)
  let mouthY = faceSize * 0.22;
  let mouthWidth = faceSize * 0.35;
  let mouthOpen = biasMode === 1 ? random(3, 12) : 4;

  noFill();
  stroke(180, 50, 80);
  strokeWeight(4);
  bezier(
    -mouthWidth, mouthY,
    -mouthWidth * 0.3, mouthY + mouthOpen,
    mouthWidth * 0.3, mouthY + mouthOpen,
    mouthWidth, mouthY
  );
}

function drawFrameUI() {
  noFill();
  stroke(80);
  strokeWeight(2);
  rect(width / 2, height / 2, width * 0.85, height * 0.75, 10);

  // Corner brackets like a scanner
  let marginX = width * 0.1;
  let marginY = height * 0.12;









