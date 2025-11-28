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

  
}









