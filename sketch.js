// Facial recognition error / bias animation
// ONLY JavaScript (sketch.js), assuming p5.js is already loaded in index.html

let faceX, faceY;
let faceSize = 260;

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

// 0 = lighter skin (system behaves "better")
// 1 = darker skin (system behaves "worse" – showing bias)
let biasMode = 0;

function setup() {
  createCanvas(600, 400);
  faceX = width / 2;
  faceY = height / 2;

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  confidence = random(60, 99);
  labelIndex = 0;
}

function draw() {
  background(5);

  drawScanLines();
  drawFrameUI();

  if (biasMode === 0) {
    confidence = lerp(confidence, random(85, 99), 0.02);
    glitchAmount = lerp(glitchAmount, 2, 0.05);
  } else {
    confidence = lerp(confidence, random(15, 60), 0.02);
    glitchAmount = lerp(glitchAmount, 15, 0.05);
  }

  if (frameCount % 45 === 0) {
    if (biasMode === 0) {
      labelIndex = random() < 0.7 ? 0 : floor(random(labels.length));
    } else {
      labelIndex = floor(random(labels.length));
    }
  }

  push();
  translate(faceX, faceY);

  let jitterX = random(-glitchAmount, glitchAmount);
  let jitterY = random(-glitchAmount, glitchAmount);
  translate(jitterX, jitterY);

  drawFace();
  pop();

  drawGlitches();
  drawOverlayText();
}

function drawFace() {
  noStroke();

  let skinTone;
  if (biasMode === 0) {
    skinTone = color(245, 210, 180);
  } else {
    skinTone = color(120, 80, 50);
  }

  fill(skinTone);
  ellipse(0, 0, faceSize, faceSize * 1.2);

  rect(0, faceSize * 0.55, faceSize * 0.3, faceSize * 0.4, 20);

  fill(40);
  rect(0, faceSize * 0.95, faceSize * 0.9, faceSize * 0.35, 50);

  let eyeOffsetX = faceSize * 0.22;
  let eyeY = -faceSize * 0.1;
  let eyeW = faceSize * 0.22;
  let eyeH = faceSize * 0.13;

  fill(240);
  ellipse(-eyeOffsetX, eyeY, eyeW, eyeH);
  ellipse(+eyeOffsetX, eyeY, eyeW, eyeH);

  let pupilOffset = biasMode === 0 ? 0 : random(-4, 4);
  fill(20);
  ellipse(-eyeOffsetX + pupilOffset, eyeY, eyeW * 0.25, eyeH * 0.5);
  ellipse(+eyeOffsetX + pupilOffset, eyeY, eyeW * 0.25, eyeH * 0.5);

  stroke(20);
  strokeWeight(4);
  let browY = eyeY - eyeH * 0.8;
  line(-eyeOffsetX - eyeW * 0.3, browY, -eyeOffsetX + eyeW * 0.3, browY);
  line(+eyeOffsetX - eyeW * 0.3, browY - 2, +eyeOffsetX + eyeW * 0.3, browY - 2);

  noFill();
  stroke(30);
  strokeWeight(3);
  beginShape();
  vertex(0, eyeY);
  vertex(0, eyeY + eyeH * 1.1);
  vertex(-eyeW * 0.1, eyeY + eyeH * 1.4);
  endShape();

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

  let marginX = width * 0.1;
  let marginY = height * 0.12;
  let bracketSize = 24;

  stroke(130);
  strokeWeight(3);

  line(marginX, marginY, marginX + bracketSize, marginY);
  line(marginX, marginY, marginX, marginY + bracketSize);

  line(width - marginX, marginY, width - marginX - bracketSize, marginY);
  line(width - marginX, marginY, width - marginX, marginY + bracketSize);

  line(marginX, height - marginY, marginX + bracketSize, height - marginY);
  line(marginX, height - marginY, marginX, height - marginY - bracketSize);

  line(width - marginX, height - marginY, width - marginX - bracketSize, height - marginY);
  line(width - marginX, height - marginY, width - marginX, height - marginY - bracketSize);
}

function drawOverlayText() {
  noStroke();

  textSize(14);
  fill(200);
  textAlign(LEFT, CENTER);
  text("FACIAL RECOGNITION SYSTEM", 20, 20);

  let modeLabel = biasMode === 0 ? "Dataset: 'Standard'" : "Dataset: Underrepresented Face";
  fill(160, 160, 220);
  textAlign(RIGHT, CENTER);
  text(modeLabel, width - 20, 20);

  textAlign(CENTER, CENTER);

  let label = labels[labelIndex];
  let y = height - 50;

  textSize(18);
  fill(230);
  text(label, width / 2, y);

  textSize(14);
  let confText = "AI Confidence: " + nf(confidence, 2, 0) + "%";
  fill(150, 255, 150);
  if (confidence < 50) {
    fill(255, 130, 130);
  }
  text(confText, width / 2, y + 24);

  textSize(12);
  fill(180);
  text("Press SPACE to toggle faces (shows bias in misrecognition)", width / 2, height - 20);
}

function drawScanLines() {
  stroke(30, 40);
  strokeWeight(1);
  for (let y = 0; y < height; y += 4) {
    line(0, y, width, y);
  }
}

function drawGlitches() {
  let count = biasMode === 0 ? 2 : 8;
  noStroke();

  for (let i = 0; i < count; i++) {
    if (random() < 0.2) {
      let gx = random(faceX - 120, faceX + 120);
      let gy = random(faceY - 120, faceY + 120);
      let gw = random(20, 90);
      let gh = random(2, 8);

      fill(random(150, 255), random(150, 255), random(150, 255), 120);
      rect(gx, gy, gw, gh);
    }
  }
}

function keyPressed() {
  if (key === " ") {
    biasMode = 1 - biasMode;
  }
}










