var player, ball, edges;
var brick1, brick2, brick3, brick4, brick5, brick6, brick7;
var brickGroup;
var lives = 3;
var livesSprite;
var livesGroup;
var gameState = 0
var lengthPowerup, lengthPowerupGroup;


function setup() {
  createCanvas(2000,1200);
  player = createSprite(1000, 1100, 200, 50);
  player.debug = true;
  ball = createSprite(1000, 600, 40, 40);

  brickGroup = new Group();
  livesGroup = new Group();
  lengthPowerupGroup = new Group();

var x = 100;

  for (i = 0; i < 3; i++){
    livesSprite = createSprite(x, 1000, 20, 20);
    x = x+ 40;
    livesSprite.shapeColor = "red";
    livesGroup.add(livesSprite);
  }
  
  spawnBricks();

  edges = createEdgeSprites();
  //ball.velocityY =  12;
  //ball.velocityX = 5;
  ball.shapeColor = "red";
  player.shapeColor = "yellow";
 
}

function draw() {
  background(0);  

  playerMovement();

 if (gameState == 0){
  fill("white");
  textSize(30)
  text("Press Space Key to Start", 850, 1000);
 }

 if (frameCount%200 == 0)
 {
   var x = Math.round(random(40, 1860))
   lengthPowerup = createSprite(x, 0, 20, 20)
   lengthPowerup.shapeColor = "yellow"
   lengthPowerup.velocityY = 6
   lengthPowerup.debug = true
  lengthPowerupGroup.add(lengthPowerup)
 }
 
  for (i = 0; i < lengthPowerupGroup.length; i ++){
    if (player.isTouching(lengthPowerupGroup.get(i)))
    {
      player.width = player.width+20
      console.log(player.width)
      lengthPowerupGroup.get(i).destroy()
    }
  }
  

 
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(player);

  if (keyDown("space"))
  {
    ball.velocityX = 5
    ball.velocityY =  12
    gameState = 1
  }
  if (ball.y > 1141 && lives > 0)
  {
    player.x = 1000;
    ball.x = 1000;
    ball.y = 700;
    ball.velocityX = 0
    ball.velocityY = 0
    lives = lives-1
    livesGroup.get(lives).destroy()
    gameState = 0
  }

  if (lives < 1)
  {
    brickGroup.destroyEach()
    textSize(32)
    fill("white")
    text("GAME OVER", 1000, 600)
    gameState = 2
    text("Press R to restart", 1000, 1000)
    player.visible = false
    ball.visible = false
  }

  for (i = 0; i< brickGroup.length ;i++){
    if (ball.isTouching(brickGroup.get(i)))
    {
      ball.bounceOff(brickGroup.get(i))
      brickGroup.get(i).destroy()
    }

  
}
if (gameState == 2 && keyDown("r")){
  restart();
}
if (brickGroup.length === 0){
  fill("white")
  textSize(30)
  text("YOU WON!",1000, 1400)
  gameState = 2
}
 drawSprites();
}

 
  


function playerMovement(){
  if (keyDown("a"))
  {
    player.x = player.x - 12
  }

  if (keyDown("d"))
  {
    player.x = player.x + 8
  }

}

function spawnBricks(){
  for (i = 200; i < 1800; i= i+170)
  {
    brick1 = createSprite(i, 100, 150, 40);
    brick1.shapeColor = "blue";
    brickGroup.add(brick1);
  }

  for (j = 200; j < 1800; j = j+170)
  {
    brick2 = createSprite(j, 180, 150, 40);
    brick2.shapeColor = "magenta"
    brickGroup.add(brick2);
  }

  for (k = 200; k < 500; k += 170)
  {
    brick3 = createSprite(k, 260, 150, 40);
    brick3.shapeColor = "blue"
    brickGroup.add(brick3);
  }

  for (i = 880; i < 1200; i+= 170)
  {
    brick4 = createSprite(i, 260, 150, 40);
    brick4.shapeColor = "blue"
    brickGroup.add(brick4);
  }

  for (i = 1560; i < 1800; i+= 170)
  {
    brick5 = createSprite(i, 260, 150, 40);
    brick5.shapeColor = "blue"
    brickGroup.add(brick5);
  }
 // h

  for (k = 200; k < 500; k += 170)
  {
    brick3 = createSprite(k, 340, 150, 40)
    brick3.shapeColor = "magenta"
    brickGroup.add(brick3);
  }

  for (i = 880; i < 1200; i+= 170)
  {
    brick4 = createSprite(i, 340, 150, 40);
    brick4.shapeColor = "magenta"
    brickGroup.add(brick4);
  }

  for (i = 1560; i < 1800; i+= 170)
  {
    brick5 = createSprite(i, 340, 150, 40);
    brick5.shapeColor = "magenta"
    brickGroup.add(brick5);
  }

  for (i = 200; i < 1800; i= i+170)
  {
    brick1 = createSprite(i, 420, 150, 40);
    brick1.shapeColor = "blue";
    brickGroup.add(brick1);
  }

  for (k = 200; k < 1800; k += 170)
  {
    brick3 = createSprite(k, 500, 150, 40)
    brick3.shapeColor = "magenta"
    brickGroup.add(brick3);
  }
}

function restart(){
  ball.x = 1000
  ball.y = 600
  player.x = 1000
  gameState = 0
  lives = 3
  spawnBricks()
  var x = 100;
  for (i = 0; i < 3; i++){
    livesSprite = createSprite(x, 1000, 20, 20);
    x = x+ 40;
    livesSprite.shapeColor = "red";
    livesGroup.add(livesSprite);
  }
  player.visible = true
  ball.visible = true
}