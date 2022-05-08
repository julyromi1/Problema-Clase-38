class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({  //La diagonal signigica que la variable esta en la raíz
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      var index =0; //El index es el contador que va a entrar a la parte de las matrices y por eso iniciamos en cero para que entre en cada elemento de la matríz.
      for (var plr in allPlayers){
        index +=1;
        var x = allPlayers [plr].positionX; //Se crea la posición de los jugadores en x.
        var y = height-allPlayers [plr].positionY;  //Lo mismo pero en Y.
        cars [index-1].position.x=x;  //cars tiene dos carros (en la linea 32) va a adquirir la posición calculada en la 51 y en la 52.
        cars [index-1].position.y=y;
      }

      drawSprites();
      this.HandlePlayerControls ();
    }
  }
  
  HandlePlayerControls (){
    if (keyIsDown (UP_ARROW)){
      player.positionY+=10;
      player.update();

    }
  }
}
