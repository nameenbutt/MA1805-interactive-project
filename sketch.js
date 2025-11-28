let video;
let labels = ["Low Confidence", "Unknown Subject", "Error", "Recalibrating..."];
let labelIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);

  // Capture live video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide default video element
}

function draw() {
  background(20);

  // Draw live video
  push();
  translate(width/2, height/2);
  scale(-1, 1); // mirror effect so it feels like a camera
  image(video, 0, 0, 640, 480);
  pop();

  // Glitch effect on the video
  let glitchAmount = map(mouseX, 0, width, 0, 50);
  for (let i = 0; i < 15; i++) {
    let y = random(height/2 - 150, height/2 + 150);
    let h = random(5, 20);
    let offset = random(-glitchAmount, glitchAmount);

    copy(
      video,
      0, y - height/2 + 240, 640, h,
      width/2 - 320 + offset, y - h/2, 640, h
    );
  }

  // Drifting “eye tracking” box (intentionally misaligned)
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  let boxOffsetX = sin(frameCount * 0.1) * 50;
  let boxOffsetY = cos(frameCount * 0.08) * 25;
  rect(width/2 - 100 + boxOffsetX, height/2 - 50 + boxOffsetY, 200, 100);

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

  // Optional random flicker overlay for glitch
  if (random(1) < 0.05) {
    fill(random(255), random(255), random(255), 100);
    rect(random(width), random(height), random(50, 150), random(5, 20));
  }
}



