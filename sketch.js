var score = 0;
var edges;
var gamestate = "server";
var snowman, snowmanImg, snowmanImg2;
var fire, fireImg, fireImg2, fireG;
var right = true;
var left = false;
var select1, select2, select3;
var scene, sceneimg;
var highscore = 0;
var snowballnum = 0;
var snowball, snowballimg, snowballG;
var snowballtbutton, snowballbuttonimg, 
leftbutton, leftbuttonimg, 
rightbutton, rightbuttonimg;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function preload(){
  snowmanImg = loadAnimation("./snowman/Snowman.png");
  snowmanImg2 = loadAnimation("./snowman/Snowman_2.png");
  fireImg = loadAnimation("./fire/fire1small.png");
  fireImg2 = loadAnimation("./fire/fire2small.png");
  sceneimg = loadImage("backgroundsmall.png");
  snowballimg = loadImage("./snowball/snowballfriend.png");
  leftbuttonimg = loadImage("left_arrow.png");
  rightbuttonimg = loadImage("right_arrow.png");
  snowballbuttonimg = loadImage("./snowball/snowballbutton.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);//400, 400

  scene = createSprite(width/2, height/2, windowWidth, windowHeight);//320, 100 //height-260 //windowWidth, height/-750
  scene.visible = false;
  //scene.addImage("background", sceneimg);
  //scene.scale = 0.2;//0.05 //2

  //oldleftbutton
  //leftbutton = createSprite(width/2-85, 55, 15, 15);
  //leftbutton.addImage("leftbuttonimg", leftbuttonimg);
  //leftbutton.visible = false;
  //newleftbutton
  leftbutton = createButton("");
  leftbutton.class("leftbutton");
  leftbutton.position(width / 2 - 85, -155);
  leftbutton.mousePressed(moveleft);
  //oldrightbutton
  //rightbutton = createSprite(width/2+85, 55, 15, 15);
  //rightbutton.addImage("rightbuttonimg", rightbuttonimg);
  //rightbutton.visible = false;
  //newrightbutton
  rightbutton = createButton("");
  rightbutton.class("rightbutton");
  rightbutton.position(width / 2 + 85, -155);
  rightbutton.mousePressed(moveright);
  //oldsnowballbutton
  //snowballbutton = createSprite(width/2, 55, 15, 15);
  //snowballbutton.addImage("snowbalbuttonimg", snowballbuttonimg);
  //snowballbutton.visible = false;
  //newsnowballbutton
  snowballbutton = createButton("");
  snowballbutton.class("snowballbutton");
  snowballbutton.position(width / 2, -155);
  snowballbutton.mousePressed(createsnowball);
  
  snowman = createSprite(width/2, height/2, 15, 15);//200, 200
  snowman.addAnimation("snowman2", snowmanImg2);
  snowman.addAnimation("snowman", snowmanImg);
  snowman.scale = 0.5;//0.2
  snowman.visible = false;
  //snowman.debug = true;
  snowman.setCollider("rectangle", 0, 45, 70, 310);

  edges = createEdgeSprites();
  
  fireG = new Group();
  snowballG = new Group();
}

function draw(){
  background('lightblue');
  image(sceneimg, 0, 0, width, height);
  if(gamestate == "end"||gamestate == "play"){
    textSize(25);
    fill('gold');
    stroke('green');
    text("Pontuação: "+score, 25, 45);
    text("Melhor Pontuação: "+highscore, 25, 75);
    text("Bolas De Neve: "+snowballnum, 25, 105);
  }
  if(gamestate == "server"){
    fill('cyan');
    stroke('green');
    textSize(20);
    text("Dica: Quando Você Sobrevive Por Um Tempo ", 15, 75);
    text("Ganha Uma Bola De Neve!", 15, 95);
    text("Pressione A/Seta Para Virar Para A Esquerda.", 15, 135);
    text("Pressione D/Seta Para Virar Para A Direita.", 15, 175);
    text("Dica: Pressione E Para Tacar Uma Bola De Neve!", 15, 45); 
    text("Clique Para Começar!", 15, 25);
    if(mousePressedOver(scene)
    ||mousePressedOver(snowman)
    ||touches.length > 0){
      gamestate = "play";
      //scene.visible = true;
      snowman.visible = true;
      rightbutton.visible = true;
      leftbutton.visible = true;
      snowballbutton.visible = true;
    }
  }
  //console.log("left: "+left);
  //console.log("right: "+right);
  snowman.collide(edges[3]);
  select1 = Math.round(random(1, 2));
  select2 = Math.round(random(1, 2));
  select3 = Math.round(random(1, 2));
  //console.log(select);
  //console.log("snowmanY: "+Math.round(snowman.y));
  console.log(snowballnum);
  //console.log(World.mouseX);
  console.log(windowWidth);
    //if(scene.x < 450){//80 //680
    //  scene.x = windowWidth-800;//320
    //}
    //if(scene.x > windowWidth-800){//320
    //  scene.x = 450;//80 //680
    //}
  /*if(keyWentUp("left_arrow")||keyWentUp("A")){
    left = false;
  }
  if(keyWentUp("right_arrow")||keyWentUp("D")){
    right = false;
  }*/
  
  if(fireG.isTouching(snowman)){
    gamestate = "end";
  }
  if(snowballG.isTouching(fireG)){
    snowballG.destroyEach();
    fireG.destroyEach();
  }
  if(gamestate == "play"){
    //if(isMobile){
      leftbutton.position(width/2 - 85 -35, 25);
      rightbutton.position(width/2 + 85 - 35, 25);
      snowballbutton.position(width/2 - 35, 25);
    //}
    if(snowballnum > 0 && keyWentDown("E")){
    //||snowballnum > 0 && mouseIsOver(snowballbutton)){
      createsnowball();
    }
    if(score%500==0){
      snowballnum = snowballnum+1;
      }
    if(keyDown("space")&&snowman.y > 285
    ||keyDown(UP_ARROW)&&snowman.y > 285
    ||keyDown("W")&&snowman.y > 285
    ||touches.length > 0&&snowman.y > 285
    &&!mouseIsOver(leftbutton)
    &&!mouseIsOver(rightbutton)
    &&!mouseIsOver(snowballbutton)){
      snowman.velocityY = -15.5;
      touches = [];
    }
    //if(right == true){
    //  scene.velocityX = -(4+3*score/100);
    //}
    //if(left == true){
    //  scene.velocityX = +(4+3*score/100);
    //}
    
    score = score + Math.round(getFrameRate()/30);
    createfire();
    
    if(keyWentDown(LEFT_ARROW)
    ||keyWentDown("A")){
    //||mouseIsOver(leftbutton)){
      //snowman.x = snowman.x-5;
      left = true;
      right = false;
      snowman.changeAnimation("snowman", snowmanImg);
    }
    if(keyWentDown(RIGHT_ARROW)
    ||keyWentDown("D")){
    //||mouseIsOver(rightbutton)){
      //snowman.x = snowman.x+5;
      right = true;
      left = false;
      snowman.changeAnimation("snowman2", snowmanImg2);
    }
    
    /*if(keyDown("left_arrow")&&keyDown("right_arrow")
    ||keyDown("D")&&keyDown("A")
    ||keyDown("D")&&keyDown("left_arrow")
    ||keyDown("A")&&keyDown("right_arrow")){
      right = false;
      left = false;
    }*/
 
  
  }
  if(gamestate == "end"){
    leftbutton.position(width / 2 - 85, -155);
    rightbutton.position(width / 2 + 85, -155);
    snowballbutton.position(width / 2, -155);
    //scene.velocityX = 0;
    snowman.visible = false;
    rightbutton.visible = false;
    leftbutton.visible = false;
    snowballbutton.visible = false;
    //scene.visible = false;
    fireG.destroyEach();
    snowballG.destroyEach();
    textSize(25);
    textAlign("center");
    fill('red');
    stroke('darkred');
    text("Fim De Jogo!", width/2, height/2);
    fill('cyan');
    stroke('green');
    text("Clique Para Jogar De Novo!", width/2, height/2-35);

    
    if(mousePressedOver(snowman)
    ||mousePressedOver(scene)
    ||touches.length > 0){
      reset();
      touches = [];
    }
  }
  if(gamestate == "play"||gamestate == "end"){
    snowman.velocityY = snowman.velocityY+0.8;
  }
  drawSprites();
}

function createfire(){
  if(frameCount%160==0){
    fire = createSprite(2550, 2550);//50, 350
    //fire.debug = true;
    fire.lifetime = 650;
    if(select1 == 1){
      fire.addAnimation("fire", fireImg);
      fire.setCollider("circle", 0, 239, 219);//3999, 5999
      fire.scale = 0.15;//0.008
    }
    if(select1 == 2){
      fire.addAnimation("fire2", fireImg2);
      fire.scale = 0.18;//0.008
      fire.setCollider("circle", 0, 153, 150);//3500, 2999
    }
    if(select2 == 1){
      fire.x = -50;
      fire.velocityX = +(5 + 2*score/150);
    }
    if(select2 == 2){
      fire.x = windowWidth+50;
      fire.velocityX = -(6 + 2*score/150);
    }
    /*if(select3 == 1){
      fire.y = windowHeight-355;
    }
    if(select3 == 2){
      fire.y = windowHeight-250;
    }*/
    fire.y = Math.round(random(200, windowHeight - 115));//200, 675
    //console.log("Created Fire!");
    fireG.add(fire);
  }
}

function reset(){
  gamestate = "play";
  //scene.visible = true;
  if(score > highscore){
    highscore = score;
  }
  score = 0;
  snowman.visible = true;
  rightbutton.visible = true;
  leftbutton.visible = true;
  snowballbutton.visible = true;
  snowman.x = width/2;
  snowman.y = height/2;
  snowballnum = 0;
}

function createsnowball(){
  if(snowballnum > 0){
    snowball = createSprite(-50, -50, 15, 15);
    snowball.addImage("snowball", snowballimg);
    snowball.lifetime = 150;
    snowball.scale = 2.8;
    if(left == true){
      snowballnum = snowballnum-1;
      snowball.velocityX = -(5 + 2*score/150);
      snowball.x = snowman.x-8
      snowball.y = snowman.y;
    }
    if(right == true){
      snowballnum = snowballnum-1;
      snowball.velocityX = +(5 + 2*score/150);
      snowball.x = snowman.x+8
      snowball.y = snowman.y;
    }
    snowballG.add(snowball);
  }
}

function moveleft(){
  //snowman.x = snowman.x-5;
  left = true;
  right = false;
  snowman.changeAnimation("snowman", snowmanImg);
}

function moveright(){
  //snowman.x = snowman.x+5;
  right = true;
  left = false;
  snowman.changeAnimation("snowman2", snowmanImg2);
}
