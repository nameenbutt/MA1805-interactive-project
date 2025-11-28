let eyeImg;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;

function preload() {
  // Correct path to your image
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
}

function draw() {
  background(20);

  if (eyeImg) {
    // --- Simulate face movement ---
    let faceX = width / 2 + sin(frameCount * 0.03) * 50;
    let faceY = height / 2 + cos(frameCount * 0.02) * 20;

    // Draw base image
    image(eyeImg, faceX, faceY, eyeImg.width, eyeImg.height);

    // --- Glitch effect around the face ---
    let glitchAmount = map(mouseX, 0, width, 0, 50);
    for (let i = 0; i < 15; i++) {
      let y = random(faceY - eyeImg.height / 2, faceY + eyeImg.height / 2);
      let h = random(5, 20);
      let offset = random(-glitchAmount, glitchAmount);

      copy(
        eyeImg,
        0, y - faceY + eyeImg.height / 2, eyeImg.width, h,
        faceX - eyeImg.width / 2 + offset, y - h / 2, eyeImg.width, h
      );
    }

    // --- Eye tracking boxes (misaligned intentionally) ---
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);

    // Left eye
    rect(faceX - 60 + sin(frameCount * 0.1) * 10, faceY - 10 + cos(frameCount * 0.15) * 5, 50, 30);
    // Right eye
    rect(faceX + 60 + cos(frameCount * 0.1) * 10, faceY - 10 + sin(frameCount * 0.15) * 5, 50, 30);

    // --- Face outline box ---
    noFill();
    stroke(0, 255, 100, 150);
    strokeWeight(2);
    rect(faceX - 120, faceY - 100, 240, 200, 50); // rounded corners

    // --- Fluctuating AI confidence ---
    let confidence = nf(random(0, 40).toFixed(2), 2, 2);
    fill(0, 255, 0);
    noStroke();
    textSize(18);
    text("Confidence: " + confidence + "%", width / 2, height / 2 + 200);

    // --- Rapidly changing status labels ---
    if (frameCount % 30 === 0) {
      labelIndex = floor(random(labels.length));
    }
    textSize(20);
    text("Status: " + labels[labelIndex], width / 2, height / 2 + 240);

    // --- Random glitch flickers ---
    if (random(1) < 0.05) {
      fill(random(255), random(255), random(255), 100);
      rect(random(width), random(height), random(50, 150), random(5, 20));
    }
  }
}




