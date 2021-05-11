var dog, dogImg, happyDogImg, hungryDog, database, foodS ,foodStock;
var foodObj, milkbottle; 
var fedTime, lastFed, feed, addFood, currentTime;
var gameState = "hungry";
var readState;
var bedroomIMG, gardenIMG, washroomIMG,sleepIMG,runIMG, livingroomImg;

function preload(){
	dogImg = loadImage("dogImg.png");
  //Milkimg = loadImage("Milk.png");
  happyDogImg = loadImage("dogImg1.png");
  hungryDog = loadImage("dogImg1.png");
  bedroomIMG = loadImage("Bed Room.png");
  gardenIMG = loadImage("Garden.png");
  washroomIMG = loadImage("Wash Room.png");
  sleepIMG = loadImage("Lazy.png");  
  runIMG = loadImage("running.png");
  livingroomImg = loadImage("Living Room.png"); 
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  //read gamestate from the database
  readState = database.ref('gamestate');
  readState.on("value", function(data){
    gameState = data.val();
  })
  
  foodObj = new Food();
  
  //milkbottle = createSprite(720,220,70,70);
  //milkbottle.addImage(Milkimg);
  //milkbottle.scale = 0.12;
  
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  
  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background("green");
  
  if(foodS !== 0){
    dog.addImage(dogImg);
    //milkbottle.visible = true;
  }else{
    dog.addImage(happyDogImg);
    //milkbottle.visible = false;
  }

  /*currentTime = hour();
  if(currentTime === (lastFed + 1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime === (lastFed + 2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    }
*/
  

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 350, 30);
  }  
  


  /*if(gameState !== "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else {
    feed.show();
    addFood.show();
    dog.display(); 
  }
  */

  if(gameState == 1){
    dog.addImage(happyDogImg);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if (gameState == 2) {
    dog.addImage(dogImg);
    dog.scale = 0.175;
    //milkbottle.visible = false;
    dog.y = 250;
  }

  var Bath = createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gamestate' : gameState});
  }));
  if(gameState == 3){
    dog.addImage(washroomIMG);
    dog.scale = 1;
    //milkbottle.visible = false;
  } 

  var Sleep = createButton("I am very sleepy");
  Sleep.position(710,125);
  if (Sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({'gamestate' : gameState});
  }));
  if (gameState == 4){
    dog.addImage(bedroomIMG);
    dog.scale = 1;
    //milkbottle.visible = false;
  }

  var Play = createButton("Lets Play!");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gamestate' : gameState});
  }));
  if(gameState == 5){
    dog.addImage(livingroomImg);
    dog.scale = 1;
    //milkbottle.visible = false;
  }

  var PlayInGarden = createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({'gamestate' : gameState});
  }));
  if(gameState == 6){
    dog.y = 175;
    dog.addImage(gardenIMG);
    dog.scale = 1;
    //milkbottle.visible = false;
  }

  var button = createButton("Feed the Dog");
  button.position(400,125);

  if(button.mousePressed(function(){
    foodS = foodS - 1;
    gameState = 1
    database.ref('/').update({'gamestate' : gameState});
  }));

  var addFood = createButton("Add food");
  addFood.position(500,125);

  if(addFood.mousePressed(function(){
    foodS = foodS + 1;
    gameState = 2;
    database.ref('/').update({'gamestate' : gameState});
  }));

  drawSprites();
}

//Function to read values from DB
function readStock(data){
  foodS = data.val();
}

function writeStock(){
  database.ref('/').update({
    food : x
  });
}

//Function to update FoodStock and last FeedTime
function feedDog(){
  dog.addImage(happyDogImg);
  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    //Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods() {
  //foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  database.ref('/').update({
    Food : foodS
  })
}

//function to update the gamestate
/*function update(state){
  database.ref('/').update({
    gamestate: state
  });
}
*/