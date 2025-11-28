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
    let b = glitchBoxes[i];

    let shakeX = random(-3, 3);
    let shakeY = random(-3, 3);

    //box
    stroke(0, 255, 100);
    strokeWeight(random(1, 4));
    noFill();
    rect(b.x + shakeX, b.y + shakeY, b.w, b.h);
    
    // label background
let labelText = b.label;
textSize(16);
let tw = textWidth(labelText) + 10; // label width

let labelX = b.x + shakeX;
let labelY = b.y + shakeY - 24; // above the box

noStroke();
fill(0, 255, 100, 150);
rect(labelX - tw / 2, labelY - 10, tw, 20); // x, y, w, h

// label text
fill(0);
textAlign(CENTER, CENTER);
text(labelText, labelX, labelY);

    //life countdown
    b.life--;
    if (b.life <= 0) glitchBoxes.splice(i, 1);
 }
}

function drawScanLines () {
  stroke(0, 255, 100, 30);
  for (let y = 0; y < height; y +=15) {
    line(0, y + (frameCount % 15), width, y + (frameCount % 15));
  }
}

  function drawStaticNoise () {
    for (let i = 0; i < 300; i ++) {
      stroke(random([0, 255]));
      point(random(width), random(height));
    }
  }

