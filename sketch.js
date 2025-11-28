let eyeImg;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;
let trackingPoints = [];
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

  // Initialize pseudo eye tracking points
  // We'll simulate 8 points over the eyes
  for (let i = 0; i < 8; i++) {
    trackingPoints.push({x: width/2 + random(-50,50), y: height/2 + random(-10,10)});
  }

  // Initialize glitch slices
  for (let i = 0; i < 30; i++) {
    glitchSlices.push({
      y: random(height/2 - 100, height/2 + 100),
      h: random(5, 25),
      offset: random(-40, 40)
    });
  }
}

function draw() {
  background(0);

  if (eyeImg) {
    let faceX = width/2 + sin(frameCount * 0.02) * 40;
    let faceY = height/2 + cos(frameCount * 0.015) * 15;

    // Draw the main eyes image
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

    // --- Simulated eye movement / tracking points ---
    for (let i = 0; i < trackingPoints.length; i++) {
      let p = trackingPoints[i];
      // Small jitter to simulate AI trying to track but failing
      let jitterX = sin(frameCount * 0.1 + i) * random(-3,3);
      let jitterY = cos(frameCount * 0.1 + i) * random(-3,3);
      ellipse(faceX + (p.x - width/2) + jitterX, faceY + (p.y - height/2) + jitterY, 8, 8);
    }

    // --- Random pixel flicker overlays for glitch ---
    for (let i = 0; i < 10; i++) {
      fill(random(255), random(255), random(255), random(50, 120));
      rect(random(width), random(height), random(5, 30), random(5, 30));
    }

    // --- Red confidence / error labels ---
    let confidence = nf(random(0, 40).toFixed(2), 2, 2);
    fill(255, 0, 0);
    noStroke();
    textSize(18);
    text("Confidence: " + confidence + "%", width/2, height/2 + 200);

    if (frameCount % 20 === 0) {
      labelIndex = floor(random(labels.length));
    }
    textSize(22);
    text("Status: " + labels[labelIndex], width/2, height/2 + 240);
  }
}







