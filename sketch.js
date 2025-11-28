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










