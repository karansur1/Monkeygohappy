var gameState = "PLAY"

var bckgrnd, bckgrndImage
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var invisibleGround

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bckgrndImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(400, 400)

  bckgrnd = createSprite(200, 200, 400, 20)
  bckgrnd.addImage(bckgrndImage);
  bckgrnd.velocityX = -3

  monkey = createSprite(80, 370)
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1



  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  invisibleGround = createSprite(200, 370, 400, 10)
}


function draw() {
  background("white")

  if(gameState === "PLAY"){
    if (keyDown("space") && monkey.y > 200) {
    monkey.velocityY = -10}
    
    
    monkey.velocityY = monkey.velocityY + 1
    
    spawnbanana();
    
  if (bckgrnd.x < 100) {
    bckgrnd.x = 300
  }
    
  if (monkey.isTouching(FoodGroup)) {
    score = score + 1
    FoodGroup.destroyEach();
  } 
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = "END"
  }
    
  drawSprites();

  fill("red")
  text("Survival Score:" + score, 200, 50);
    
    
  }
  
  if(gameState==="END"){
    textSize(40)
    fill("red")
    text("YOU LOSE!",70,200);
  }


  monkey.collide(invisibleGround);
  
  




  invisibleGround.visible = false







}



function spawnbanana() {
  if (frameCount % 150 === 0) {
    banana = createSprite(400, random(150, 200), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.scale = 0.1
    banana.lifetime = 150
    FoodGroup.add(banana);

    obstacle = createSprite(400, 360, 10, 10)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -3
    obstacle.scale = 0.1
    obstacle.lifetime = 150
    obstacleGroup.add(obstacle);
  }
}