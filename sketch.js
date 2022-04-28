let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(220);
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1.5;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(255, 0, 0);
      stroke('red')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('black');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      fill(255, 0, 0);
      stroke('red')
      ellipse(this.location.x, this.location.y, 60, 60)
      
      line(this.location.x-10, this.location.y-10, projPoint.x-1, projPoint.y-1)
      line(this.location.x+10, this.location.y+10, projPoint.x-1, projPoint.y-1)
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      
     
      circle(wanderPoint.x, wanderPoint.y, 16);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    noStroke();
    translate(this.location.x, this.location.y)
    rotate(theta)
    
    //bagian atas
    fill(109,112,79)
    rect(-298,-20,100,20)

   
    triangle(-308,-20,-298,0,-313,0)

  
    triangle(-198,-20,-198,0,-183,0)


    rect(-313,0,130,30)

    
    rect(-183,-2,130,15)


  
    ellipse(-50,5.5,20,20)

   
    
    

// bagian tengah
    
    rect(-338,50,230,30)

    
    triangle(-158,30,-158,50,-143,50)

  
    rect(-338,30,180,20)

    
    triangle(-108,50,-108,80,-48,80)
  


// roda roda    
    ellipse(-148,105,40,40)

    
    ellipse(-328,105,40,40)

    
    ellipse(-283,105,40,40)

    
    ellipse(-238,105,40,40)

    
    ellipse(-193,105,40,40)

    
    ellipse(-103,105,40,40)
  
  
    
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}