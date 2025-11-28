function setup() {
createCanvas(400,400)
}

function draw() {
  background(220);
}

// BROKEN FACIAL RECOGNITION (IMAGE-ONLY VERSION)
// Only uses p5.js and your image: images/eyes.jpg

let eyeImg;
let statusMessages = [
  "Low confidence",
  "Unknown subject",
  "Face not detected",
  "Re-scanning...",
  "Error: Cannot classify",
  "Model bias detected"
];
let currentStatus = 0;

function preload() {
  // Load your eyes image from the images folder
  eyeImg = loadImage("images/eyes.jpg");
}

function setup() {
  createCanvas(900, 450);
  imageMode(CENTER);
  textFont("monospace");
}

function draw() {
  background(0);

  // slight shifting movement (fake “AI searching”)
  let moveX = sin(frameCount * 0.02) * 8;
  let moveY = cos(frameCount * 0.015) * 4;

  // draw your eyes image
  image(eyeImg, width/2 + moveX, height/2 + moveY, 700, 350);

  // ----- HORIZONTAL GLITCH SLICES -----
  for (let i = 0; i < 25; i++) {
    let sliceY = random(height/2 - 120, height/2 + 120);
    let sliceH = random(4, 18);
    let offset = random(-60, 60);

    copy(
      eyeImg,
      0, sliceY - (height/2 - 175),
      eyeImg.width, sliceH,
      width/2 - 350 + offset,
      sliceY,
      700, sliceH
    );
  }

  // ----- MISALIGNED DETECTION BOX -----
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);

  rect(
    width/2 - 180 + random(-5,5),
    height/2 - 80 + random(-5,5),
    360,
    160
  );

  // ----- RANDOM PIXEL NOISE -----
  for (let i = 0; i < 30; i++) {
    fill(random(255), random(255), random(255), random(40,100));
    noStroke();
    rect(random(width), random(height), random(4,20), random(4,20));
  }

  // ----- ERROR MESSAGES / LOW CONFIDENCE -----
  if (frameCount % 25 === 0) {
    currentStatus = int(random(statusMessages.length));
  }

  fill(0,255,0);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("FACIAL RECOGNITION v1.0", 20, 20);
  text("Status: " + statusMessages[currentStatus], 20, 45);

  let confidence = nf(random(0, 35).toFixed(2), 2, 2);
  text("Confidence: " + confidence + "%", 20, 70);

  // bottom warning
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("⚠ Failed to identify subject", width/2, height - 25);
}








