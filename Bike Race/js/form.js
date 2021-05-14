class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    
    this.title = createElement('h2');
    this.reset = createButton('Reset');
    this.name1 = createElement('h4');
    this.greeting = createElement('h1')
    this.greeting1 = createElement('h1')
  }
  hide(){
   
    this.button.hide();
    this.input.hide();
    this.name1.hide();
    this.button1.hide();
    this.button2.hide();
    this.greeting.hide();
  }

  display(){
    this.title.position(displayWidth/2+250,50);
    this.title.html("BIKE RACING");
    this.name1.position(displayWidth/2 + 180,displayHeight/2 - 100);
    this.name1.html("Enter your name");
    this.input.position(displayWidth/2 + 300 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 350, displayHeight/2);

    this.reset.position(displayWidth+300,displayHeight/2-250);
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.name1.hide();
      this.button1 = createButton('Single Player');
    this.button2 = createButton('Multiplayer');
      this.button1.position(displayWidth/2 + 50, displayHeight/2);
      this.button2.position(displayWidth/2 + 500, displayHeight/2);
      this.button2.mousePressed(()=>{
        this.button1.hide();
        this.button2.hide();
        this.name = this.input.value();
        this.greeting.position(displayWidth/2+250,displayHeight/2-150);
        this.greeting.html("Hello  " + this.name);
        player.name = this.input.value();
        playerCount+=1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
      })
       this.button1.mousePressed(()=>{
         this.button1.hide();
         this.button2.hide();
         this.greeting1.position(displayWidth/2+250,displayHeight/2-150);
         this.greeting1.html("Cross the end line before 3 minutes");
         gameState = 3;
       })
      
     
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      database.ref('/').update({
        CarsAtEnd:0
      }
      )

      var playerInfoRef = database.ref('players');
      playerInfoRef.remove();
    });
  }
}