let glitchBoxes = [];
let labels = ["unknown","??","Error","Face?","Access Denied","Loading...","Scanning"];

function setup() {
  createCanvas (windowWidth, windowHeight);
  noCursor(); //hide mouse for cool effect
}

function draw () {
  background(0, 20, 30);

  drawCameraFeed();
  drawFakeFaceBoxes();
  drawScanLines();
  drawStaticNoise();
}

function drawCameraFeed() {
  //Fake bluury camera background 
  noStroke();
  fill(40, 60, 80);
  rect(0, 0, width, height);
}

function drawFakeFaceBoxes() {
  if (frameCount % 20 === 0) {
    glitchBoxes.push ({
      x: random(width),
      y: random(height),
      w: random(80, 160),
      h: random(80, 160),
      life: 60,
      label: random(labels)
    });
  }

  for (let i = glitchBoxes.length - 1; i >=0; i--) {
    let b = glitchBoxes(i);

    let shakeX = random(-3, 3);
    letshakeY = random(-3, 3);

    stroke(0, 255, 100);
    strokeWeight(random(1, 4));
    noFill();
    rect(b.x + shakeX, b.y + shakeY, b.w, b.h);
    
    fill(0, 255, 100);
    strokeWeight(random(1, 4));
    noFill();
    rect(b.x + shakeX + b.y + shakeY - 6);

    b.life--;
    if (b.life <= 0) glitchBoxes.splice(i, 1);
}
}

function drawScanLines () {
  stroke(0, 255, 100, 30);
}
