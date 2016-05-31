function CuerpoRobot(Tmaño,x,y,z){
THREE.Object3D.call(this);
  //  iNICIO
THREE.ImageUtils.crossOrigin=' ';
var texturaC= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen1.jpg');
this.Camara= new THREE.Mesh(new THREE.SphereGeometry(Tmaño/2) ,new THREE.MeshPhongMaterial({map: texturaC}));
this.Camara.position.y=2/y;
this.Camara.position.z=z+10;

var texturaA= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen2.JPG');
this.Antena= new THREE.Mesh(new THREE.CylinderGeometry(Tmaño/1.5,Tmaño/1.5,Tmaño/4),new THREE.MeshPhongMaterial({map: texturaA}));
this.Antena.position.y=-2/y;
this.Antena.position.z=z+9;

var texturaR= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen4.jpg');
this.Rostro= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/10,Tmaño/10,Tmaño/2.5),new THREE.MeshPhongMaterial({map: texturaR}));
this.Rostro.position.y=-9/y;
this.Rostro.position.z=z+8;

var texturaO= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
this.OrejaI= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/5, Tmaño/2, Tmaño/2.5 ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaI.position.x=-7.5/x;
this.OrejaI.position.y=-9/y;
this.OrejaI.position.z=z+7;

this.OrejaD= new THREE.Mesh(new THREE.BoxGeometry( Tmaño/5, Tmaño/2,Tmaño/2.5 ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaD.position.x=7.5/x;
this.OrejaD.position.y=-9/y;
this.OrejaD.position.z=z+7;

this.Cuello= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/3,Tmaño/3,Tmaño/2.5),new THREE.MeshPhongMaterial({map: texturaO}));
this.Cuello.position.y=-15/y;
this.Cuello.position.z=z+5;

var texturaP= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen5.JPG');
this.Panza= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/9,Tmaño/9,Tmaño/5 ),new THREE.MeshPhongMaterial({map: texturaP}));
this.Panza.position.y=-20/y;
this.Panza.position.z=z+4;

var texturaPn= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen7.jpg');
this.PiernaI= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/3,Tmaño/10,Tmaño/1),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaI.position.x=-3/x;
this.PiernaI.position.y=-30/y;
this.PiernaI.position.z=z;

this.PiernaD= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/3,Tmaño/10,Tmaño/1),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaD.position.x=3/x;
this.PiernaD.position.y=-30/y;
this.PiernaD.position.z=z;

var texturaB= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen8.jpg');
this.BrazoI= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/3,Tmaño/5,Tmaño/3),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoI.position.x=-6/x;
this.BrazoI.position.y=-21/y;
this.BrazoI.position.z=z+3;

this.BrazoD= new THREE.Mesh(new THREE.BoxGeometry(Tmaño/3,Tmaño/5,Tmaño/3),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoD.position.x=6/x;
this.BrazoD.position.y=-21/y;
this.BrazoD.position.z=z+3;

step=0.01;
step1=0.02;
//FiN
this.add(this.Camara,this.Rostro,this.Antena,this.PiernaI,this.PiernaD,this.BrazoD,this.BrazoI,this.Panza,this.OrejaI,this.OrejaD,this.Cuello);
}
CuerpoRobot.prototype=new THREE.Object3D();

function Sensor(position, direction) {
  THREE.Raycaster.call(this,position, direction);
  this.colision = false;
}

Sensor.prototype = new THREE.Raycaster();

function Robot (size, x,y){
  Agent.call(this,x,y);
  //var texturar=THREE.ImageUtils.loadTexture('https://UPIIDK.github.io/rv/Imagenes/LLanta.jpg');
  this.sensor = new Sensor();
  //this.actuator = new THREE.Mesh(new THREE.SphereGeometry(size),new THREE.MeshBasicMaterial({map: texturar}));
  this.actuator=new CuerpoRobot(size,x,y,0);
  this.actuator.commands=[];
  this.actuator.size=size;
  this.add(this.actuator);
}

Robot.prototype = new Agent();

Robot.prototype.sense = function(environment){
  this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
  var obstaculo= this.sensor.intersectObjects(environment.children,true);
  if((obstaculo.length>0 && (obstaculo[0].distance<=.5)))
    this.sensor.colision=true;
  else
    this.sensor.colision=false;
}
Robot.prototype.plan=function (environment){
  this.actuator.commands=[];
  if (this.sensor.colision==true)
    this.actuator.commands.push('rotateCCW');
  else
    this.actuator.commands.push('goStraight');
}
Robot.prototype.act=function(environment){
  var command=this.actuator.commands.pop();
  if( command==undefined)
    console.log('Undefined command');
  else if(command in this.operations)
    this.operations[command](this);
  else
    console.log('Unknown command');
}
  
  //las operaciones posibles con este robot son
  //goStraight()
  //rotateCW()
  //rotateCCW()
  
  Robot.prototype.operations={};
  
  Robot.prototype.operations.goStraight= function(robot, distance){
  if(distance== undefined)
    distance= .05;
  robot.position .x+= distance*Math.cos(robot.rotation.z);
  robot.position .y+= distance*Math.sin(robot.rotation.z);
  
}

Robot.prototype.operations.rotateCW= function (robot,angle){
  if(angle==undefined)
   angle = -Math.PI/2;
  robot.rotation.z+=angle;
}

Robot.prototype.operations.rotateCCW=function(robot,angle){
  if(angle== undefined)
    angle = Math.PI/2;
  robot.rotation.z+=angle;
}
