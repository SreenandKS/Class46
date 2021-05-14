class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);

    cars = [car1, car2, car3, car4];
  }


  play(){
    form.hide();
    background(img);
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      textSize(120);
      text("Your Rank"+ player.rank,displayWidth/2-50,y-120);

    }

    drawSprites();
    
  }

  start1(){
    car5 = createSprite(500,300,100,100);
    car5.addImage(carSingle);
  }

 async play1(){
  background(rgb(198,135,103));



  image(track,0,-displayHeight*4,displayWidth, displayHeight*5);
  

  
 
  image(carSingle,car5.x,car5.y,200,200);
  
    console.log("single player")
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJson = await response.json();

    var dateTime = responseJson.datetime;
    var min = dateTime.slice(14,16);
     
    console.log(min);
    if(keyIsDown(UP_ARROW)){
      car5.y += 50;
      camera.position.x = displayWidth/2;
      camera.position.y = car5.y;
    }
    var distanceTravelled = car5.y-200;
    textSize(20);
    fill("red");
    text("Distance Travelled : " + distanceTravelled,displayWidth/2,displayHeight/2)
    drawSprites();
    fill("white");
    textSize(20);
    text(min,200,200);
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
  
}