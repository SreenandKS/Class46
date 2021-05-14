var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4, car5;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  img = loadImage("background.jpg")
  track = loadImage("track.png");
  car1_img = loadImage("download__1_-removebg-preview.png");
  car2_img = loadImage("2-removebg-preview.png");
  car3_img = loadImage("3-removebg-preview.png");
  car4_img = loadImage("4-removebg-preview.png");

  carSingle = loadImage("download__1_-removebg-preview.png");
  sound1 = loadSound("bike.mp3");
  sound2 = loadSound("b.mp3");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  game.start1();
}


function draw(){
  

  // if(gameState===0){
    
  //   sound1.play();
   
    
  // }

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if(gameState === 3){
    game.play1();
  }
}