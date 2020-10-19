//Create variables here
var dog,happydog;
var foodS,foodstock;
var dogimg,dogimg2;
var database;

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  dogimg2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(200,300,50,50);
  dog.addImage(dogimg);
  dog.scale=0.25;
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg2);
  }
  drawSprites();
  //add styles here
  textSize(20);
  text("NOTE:Press up arrow key to feed the dog",50,50);
  textSize(30);
  text("Food remaining:"+foodS,100,100);
}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
