let eyeImg;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;
let glitchSlices = [];

function preload() {
  // Use your actual image in images folder
  eyeImg = loadImage('images/eyes.jpg', 
    () => console.log('Image loaded!'), 
    () => console.error('Image failed to load')
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);

  // Initialize glitch slices
  for (let i = 0; i < 20; i++) {
    glitchSlices.push({
      y: random(height/2 - 100, height/2 + 100),
      h: random(5, 20),
      offset: random(-30, 30)
    });
  }
}

function draw() {
  background(20);

  if (eyeImg) {
    // --- Face-like movement ---
    let faceX = width / 2 + sin(frameCount * 0.02) * 50;
    let faceY = height / 2 + cos(frameCount * 0.015) * 20;

    // Draw base image
    image(eyeImg, faceX, faceY, eyeImg.width, eyeImg.height);

    // --- Apply glitch slices ---
    for (let i = 0; i < glitchSlices.length; i++) {
      let s = glitchSlices[i];
      copy(
        eyeImg,
        0, s.y - height/2 + eyeImg.height/2, eyeImg.width, s.h,
        faceX - eyeImg.width/2 + s.offset, s.y - s.h/2, eyeImg.width, s.h
      );
    }

    // --- Simulated failing eye boxes ---
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);

    // Left eye
    rect(faceX - 60 + sin(frameCount * 0.1) * 15, faceY - 10 + cos(frameCount * 0.15) * 8, 50, 30);
    // Right eye
    rect(faceX + 60 + cos(frameCount * 0.1) * 15, faceY - 10 + sin(frameCount * 0.15) * 8, 50, 30);

    // --- Face outline (optional) ---
    noFill();
    stroke(0, 255, 100, 150);
    strokeWeight(2);
    rect(faceX - 120, faceY - 100, 240, 200, 50);

    // --- Fluctuating confidence labels ---
    let confidence = nf(random(0, 40).toFixed(2), 2, 2);
    fill(0, 255, 0);
    noStroke();
    textSize(18);
    text("Confidence: " + confidence + "%", width / 2, height / 2 + 200);

    if (frameCount % 30 === 0) {
      labelIndex = floor(random(labels.length));
    }
    textSize(20);
    text("Status: " + labels[labelIndex], width / 2, height / 2 + 240);

    // --- Random glitch overlays to mimic failing AI ---
    if (random(1) < 0.05) {
      fill(random(255), random(255), random(255), 100);
      rect(random(width), random(height), random(50, 150), random(5, 20));
    }
  }
}





