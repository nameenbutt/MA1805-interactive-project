let eyeImg;

function preload() {
  eyeImg = loadImage('eyes.jpg'); // Make sure this path is correct
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(eyeImg, width/2, height/2); // Display the image
}


