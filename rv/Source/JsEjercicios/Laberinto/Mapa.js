function Wall(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
var texturaW= THREE.ImageUtils.loadTexture('http://UPIIDK.github.io/rv/Imagenes/hoja-metalica.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,(0.4/1)+(0.5/1)+(1/1)+(0.3/1)+(0.5/1)+(0.2/1)),new THREE.MeshLambertMaterial({map: texturaW}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}

Wall.prototype=new THREE.Mesh();

function Piso(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
var texturaP= THREE.ImageUtils.loadTexture('http://UPIIDK.github.io/rv/Imagenes/MetalRayado.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,0.1),new THREE.MeshPhongMaterial({map: texturaP}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}
Piso.prototype=new THREE.Mesh();

function Techo(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
  var texturaP= THREE.ImageUtils.loadTexture('http://UPIIDK.github.io/rv/Imagenes/MetalRayado.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,0.1),new THREE.MeshPhongMaterial({map: texturaP}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}
Techo.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
  var _offset=Math.floor(map.length/2);
  for(var i=0;i<map.length;i++)
  for(var j=0;j<(map.length)-1;j++){
    if(map[i][j] === "x")
      this.add(new Wall(1,j-_offset,-(i-_offset),0));
         if(map[i][j] === "r"){
    this.add(new Robot(1,j-_offset,-(i-_offset)));
     xR=j-_offset;
     yR=-(i-_offset);
    this.add(new Piso(1,j-_offset,-(i-_offset),-0.9));}
    if(map[i][j]!=="'\0'")
    {
    this.add(new Piso(1,j-_offset,-(i-_offset),-0.9));
    this.add(new Techo(1,j-_offset,-(i-_offset),(0.4/1)+(0.5/1)+(1/1)+(0.3/1)+(0.5/1)+(0.2/1)));
    }
    if(map[i][j]==="F"){
    luzMeta=new THREE.PointLight(0x00FF00);
    var xl=j-_offset;;
    var yl=-(i-_offset);
luzMeta.position.z=10;
luzMeta.position.x=xl;
luzMeta.position.y=yl;
environment.add(luzMeta);
  }
  }
}

function setup(){
  var mapa = new Array();
  mapa[0]  = "xxxxxxxxxxxxxxxxxxxx";
  mapa[1]  = "x  x              Fx";
  mapa[2]  = "x                  x";
  mapa[3]  = "x                  x";
  mapa[4]  = "x     x            x";
  mapa[5]  = "x      x           x";
  mapa[6]  = "x                  x";
  mapa[7]  = "x       x          x";
  mapa[8]  = "xxx   xxxx     xxxxx";
  mapa[9]  = "x                  x";
  mapa[10] = "x       x          x";
  mapa[11] = "x       x          x";
  mapa[12] = "x       xx         x";
  mapa[13] = "x                  x";
  mapa[14] = "x                  x";
  mapa[15] = "x                  x";
  mapa[16] = "xx   xxx  xx    xxxx";
  mapa[17] = "x                  x";
  mapa[18] = "x     r       x    x";
  mapa[19] = "x             x    x";
  mapa[20] = "xxxxxxxxxxxxxxxxxxxx";
  
  environment = new Environment();
  
  environment.setMap(mapa);
  
  camara=new THREE.PerspectiveCamera();
  //Valores obtenidos a prueba y error
  camara.position.x=xR;
  camara.position.y=yR;
  camara.position.z=(0.5/1)+(1/1)+(0.3/1);
  camara.rotation.x=4.71;
  camara.rotation.y=-Math.PI/2;
  camara.rotation.z=-Math.PI;
  
 luzPuntual=new THREE.PointLight(0xFFFFFF);
luzPuntual.position.z=camara.position.z;
luzPuntual.rotation.x=camara.rotation.x;
luzPuntual.rotation.y=camara.rotation.y;
luzPuntual.rotation.z=camara.rotation.z;

  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  
  environment.add(camara,luzPuntual);
}

function loop(){
  requestAnimationFrame(loop);
  
  environment.sense();
  environment.plan();
  environment.act();
  
  renderer.render(environment,camara);

}

var environment, camara, renderer,luzMeta,luzPuntual,xR,yR;

setup();
loop();
