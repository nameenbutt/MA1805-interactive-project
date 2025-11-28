// SIMPLE BROKEN FACIAL RECOGNITION (BEGINNER VERSION)
// Only p5.js is used — no tracking, no extra libraries

let eyeImg;
let statusMessages = [
  "Low confidence",
  "Unknown subject",
  "Face not detected",
  "Re-scanning...",
  "Error: Cannot classify",
  "Data insufficient"
];
let currentStatus = 0;

function preload() {
  // Load YOUR image from the images folder
  eyeImg = loadImage("images/eyes.jpg");
}

function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
  textFont("monospace");
}

function draw() {
  background(0);

  // Slight movement (like “AI trying to detect”)
  let shakeX = sin(frameCount * 0.03) * 10;
  let shakeY = cos(frameCount * 0.02) * 5;

  // Draw your eyes image
  image(eyeImg, width/2 + shakeX, height/2 + shakeY, 600, 300);

  // --- GLITCH SLICES ---
  for (let i = 0; i < 20; i++) {
    let sliceY = random(height/2 - 120, height/2 + 120);
    let sliceH = random(5, 20);
    let offset = random(-40, 40);

    copy(
      eyeImg,
      0, sliceY - (height/2 - 150),
      eyeImg.width, sliceH,
      width/2 - 300 + offset,
      sliceY,
      600, sliceH
    );
  }

  // --- MISALIGNED “DETECTION BOX” ---
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  rect(
    width/2 - 150 + random(-4, 4),
    height/2 - 60 + random(-4, 4),
    300,
    120
  );

  // --- RANDOM PIXEL NOISE ---
  for (let i = 0; i < 20; i++) {
    fill(random(255), random(255), random(255), random(40, 120));
    noStroke();
    rect(random(width), random(height), random(5, 20), random(5, 20));
  }

  // --- FAILING AI TEXT OVERLAY ---
  if (frameCount % 30 === 0) {
    currentStatus = int(random(statusMessages.length));
  }

  fill(0, 255, 0);
  textSize(14);
  noStroke();
  textAlign(LEFT, TOP);

  text("FACIAL RECOGNITION v1.0", 20, 20);
  text("Status: " + statusMessages[currentStatus], 20, 45);
  text("Confidence: " + nf(random(0, 40).toFixed(2), 2, 2) + "%", 20, 70);

  // bottom warning
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("⚠ Unable to identify subject", width/2, height - 20);
}







