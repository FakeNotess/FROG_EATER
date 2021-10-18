var jungle0,bgImg;
var player, shooterImg, shooter_shooting;
var fly, zombieImg;
var rock, rockImg
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;

var gameState = "fight"

var rockGroup

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/sprite_0.png")
  shooter_shooting = loadImage("assets/sprite_0.png")

  zombieImg = loadImage("assets/fly.png")

  bgImg = loadImage("assets/jungle0.png")
rockImg=loadImage("assets/rock0.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = .1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.0105
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()
    rockGroup= new Group()


}

function draw() {
  background(0); 


if(gameState === "fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bullet.shapeColor="pink"
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}

if(rockGroup.isTouching(bulletGroup)){
for(var i=0;i<rockGroup.length;i++){
if(zombieGroup[i].isTouching(bulletGroup)){
rockGroup[i].destroyEach()
bulletGroup.destroyEach()
gameState=lost

}



}

}



//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 
 }
}


//destroy rock
if(rockGroup.isTouching(player)){

  for(i=0;i,rockGroup.length;i++){
  if(rockGroup[i].isTouching(player)){
    rockGroup[i].destroy()
  }
  
  }
  
  }

  

//calling the function to spawn zombies
enemy();
}

drawSprites();

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of tounges!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%70===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.005
    zombie.velocityX = -2
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }



if(frameCount%90===0){
rock=createSprite(random(500,1100),random(100,500),40,40)

rock.addImage(rockImg)
rock.scale=0.035
rock.velocityX= -2
rock.setCollider ("rectangle",0,0,400,400)


rock.lifetime=400
rockGroup.add(rock)

}

}
