let eyeImg;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;

function preload() {
  // Load your actual image
  eyeImg = loadImage('eyes.jpg', 
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
    // Draw base image
    image(eyeImg, width/2, height/2);

    // Glitch effect based on mouseX
    let glitchAmount = map(mouseX, 0, width, 0, 50);

    for (let i = 0; i < 10; i++) {
      let y = random(height/2 - 100, height/2 + 100);
      let h = random(5, 20);
      let offset = random(-glitchAmount, glitchAmount);

      copy(
        eyeImg,
        0, y - height/2 + eyeImg.height/2, eyeImg.width, h,
        width/2 - eyeImg.width/2 + offset, y - h/2, eyeImg.width, h
      );
    }

    // Drifting tracking box (misaligned)
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    let boxOffsetX = sin(frameCount * 0.1) * 40;
    let boxOffsetY = cos(frameCount * 0.08) * 20;
    rect(width/2 - 120 + boxOffsetX, height/2 - 40 + boxOffsetY, 240, 80);

    // Fluctuating AI confidence
    let confidence = nf(random(0, 40).toFixed(2), 2, 2);
    fill(0, 255, 0);
    noStroke();
    textSize(18);
    text("Confidence: " + confidence + "%", width/2, height/2 + 120);

    // Rapidly changing status labels
    if (frameCount % 30 === 0) {
      labelIndex = floor(random(labels.length));
    }
    textSize(20);
    text("Status: " + labels[labelIndex], width/2, height/2 + 160);

    // Optional: random flicker glitch overlay
    if (random(1) < 0.05) {
      fill(random(255), random(255), random(255), 100);
      rect(random(width), random(height), random(50, 150), random(5, 20));
    }
  }
}


