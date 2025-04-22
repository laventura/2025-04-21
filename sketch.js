// Atul Acharya 
// 01 - Particle System - using Perling noise 


let particles = [];
let n = 200;
let colors;
let squiggliness = 1/125;
let alpha = 25;

// Save 
let saveButton;
let formatSelect;
let controlsDiv;

function setup() {
  // create canvas and center it
  let cnv = createCanvas(600, 600);
  // cnv.center('horizontal');
    // Center canvas properly
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
  noStroke();
    background(0);
    updateParticles();
    setInterval(updateParticles, 300); // milli seconds

  // Create UI elements for saving
  controlsDiv = createDiv();
  controlsDiv.id('controls');
  controlsDiv.style('width', '600px');
  controlsDiv.style('text-align', 'center');
  controlsDiv.position(x, y + height + 20);
  // createDiv().id('controls').position(10, height + 10);
  
  formatSelect = createSelect();
  // formatSelect.position(10, height + 15);
  formatSelect.option('jpg');
  formatSelect.option('webp');
  formatSelect.parent(controlsDiv);
  formatSelect.style('margin-right', '10px');
  
  saveButton = createButton('Save Image');
  // saveButton.position(80, height + 15);
  saveButton.mousePressed(saveArtwork);
  saveButton.parent(controlsDiv);
}

function draw() {
  // background(220);
  for (let p of particles) {
    p.draw();
    p.move();
  }
}

function updateParticles() {
  // particles = [];
  for (let i = 0; i < n; i++) {
    let x_ = random(-50, width + 50);
    let y_ = random(-50, height + 50);
    // let s_ = 0.5;
    let s_ = random(0.1, 1.0); // random size
    // Create a random color with the specified alpha
    let c_ = color(random(255), random(255), random(255), alpha);
    // let c_ = color(255, alpha);
    particles.push(new Particle(x_, y_, s_, c_));
  }
}

function saveArtwork() {
    // Get the selected format
    let format = formatSelect.value();
    // Create a timestamp for the filename
    let timestamp = year() + nf(month(), 2) + nf(day(), 2) + '_' + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
    // Save the canvas with the timestamp and format
    save('particle_art_' + timestamp + '.' + format);
}

function windowResized() {
    // Recenter canvas and controls when window is resized
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    
    // Update canvas position
    let cnv = select('canvas');
    cnv.position(x, y);
    
    // Update controls position
    controlsDiv.position(x, y + height + 20);
  }
  
class Particle {
  constructor(x_, y_, s_, c_) {
    this.x = x_;
    this.y = y_;
    this.size = s_;
    this.c = c_;
    this.dist = 0.5;
  }
  
  move() {
    let theta = noise(this.x * squiggliness, this.y * squiggliness) * PI * 4;
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;

  }
  
  draw() {
    fill(this.c);
    circle(this.x, this.y, this.size);
  }
} // Particle