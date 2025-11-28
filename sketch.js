let eyeImg;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;
let glitchSlices = [];

function preload() {
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

  // Initialize slices for glitch effect
  for (let i = 0; i < 50; i++) {
    glitchSlices.push({
      y: random(height/2 - 100, height/2 + 100),
      h: random(5, 30),
      offset: random(-50, 50),
      colorShift: random(0, 255)
    });
  }
}

function draw() {
  background(0);

  if (eyeImg) {
    // --- Face-like movement ---
    let faceX = width / 2 + sin(frameCount * 0.02) * 50;
    let faceY = height / 2 + cos(frameCount * 0.015) * 20;

    // Draw base image
    image(eyeImg, faceX, faceY, eyeImg.width, eyeImg.height);

    // --- Apply horizontal glitch slices ---
    for (let i = 0; i < glitchSlices.length; i++) {
      let s = glitchSlices[i];
      copy(
        eyeImg,
        0, s.y - height/2 + eyeImg.height/2, eyeImg.width, s.h,
        faceX - eyeImg.width/2 + s.offset, s.y - s.h/2, eyeImg.width, s.h
      );
      // Optional: slight red/blue color shift for RGB glitch effect
      tint(255, 255, 255, random(150, 255));
      image(eyeImg, faceX + random(-5, 5), faceY + random(-5, 5), eyeImg.width, eyeImg.height);
      noTint();
    }

    // --- Random pixelation / flicker overlays ---
    for (let i = 0; i < 10; i++) {
      fill(random(255), random(255), random(255), random(50, 120));
      rect(random(width), random(height), random(5, 30), random(5, 30));
    }

    // --- Random color channel shifts for chaotic glitching ---
    filter(THRESHOLD, 0.5);
    filter(DILATE);

    // --- Fluctuating confidence labels ---
    let confidence = nf(random(0, 40).toFixed(2), 2, 2);
    fill(255, 0, 0); // red text for “error” feel
    noStroke();
    textSize(18);
    text("Confidence: " + confidence + "%", width / 2, height / 2 + 200);

    // --- Rapidly changing status labels ---
    if (frameCount % 20 === 0) {
      labelIndex = floor(random(labels.length));
    }
    textSize(22);
    text("Status: " + labels[labelIndex], width / 2, height / 2 + 240);
  }
}






