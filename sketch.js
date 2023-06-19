var forest, bgImg
var boy, boyWalkingRight, boyWalkingLeft, boyStandingRight, boyStandingLeft
var button
var rules, paper
var hotel, hotel_image
var isTeleported = false
var addAccessToBasement = false
var reception, reception_bg
var lockkey_1, lockpick, guestbook
var noteImg, text1
var hiddenRoom, hiddenRoom_image
var startButton
var endOfReception
var basement, basement_image
var lockpick
var startButton_image

var gameState = "Splash"
var isVideoPlaying = false;
var mystery_image
var isUnlocked = false;


function preload() {
  bgImg = loadImage('../assets/forestBg.jpeg')
  boyWalkingRight = loadAnimation(
    '../assets/boy_right/boy_walking_right (4).png',
    '../assets/boy_right/boy_walking_right (5).png',
    '../assets/boy_right/boy_walking_right (6).png',
    '../assets/boy_right/boy_walking_right (7).png',
    '../assets/boy_right/boy_walking_right (8).png',
    '../assets/boy_right/boy_walking_right (9).png')
  boyWalkingLeft = loadAnimation(
    '../assets/boy_left/boy_walking_left (1).png',
    '../assets/boy_left/boy_walking_left (2).png',
    '../assets/boy_left/boy_walking_left (3).png',
    '../assets/boy_left/boy_walking_left (4).png',
    '../assets/boy_left/boy_walking_left (5).png',
    '../assets/boy_left/boy_walking_left (6).png');
  boyStandingRight = loadImage('../assets/boy_right/boy_walking_right (8).png')
  boyStandingLeft = loadImage('../assets/boy_left/boy_walking_left (5).png')
  rules = loadImage('../assets/paper_bg.png')
  hotel_image = loadImage('../assets/hotel.png')
  reception_bg = loadImage('../assets/reception.jpg')
  keyImg = loadImage('../assets/key.png')
  noteImg = loadImage('../assets/paper_bg.png')
  hiddenRoom_image = loadImage('../assets/room_selection.jpg')
  hotel_room = loadImage('../assets/hotel_room.jpg')
  // splashImg = createImg('../assets/Adventure Games.gif')
  basement_image = loadImage('../assets/basement.jpeg')
  mystery_image = loadImage('../assets/Mystery.png')
  txt1_image = loadImage('../assets/txt1.png')
  guestbook_image = loadImage('../assets/guestbook.png')

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width, height)

  /* vidElement = createVideo("../assets/AdventureGames.mp4");
   vidElement.position(0, 0); // Set the position to (0, 0) to start from the top-left corner
   vidElement.size(windowWidth, windowHeight); // Set the size to match the window dimensions
   vidElement.play() */
  boy = createSprite(50, 400, 30, 30)
  boy.addImage("standingR", boyStandingRight)
  boy.addAnimation("walkingR", boyWalkingRight)
  boy.addImage("standingL", boyStandingLeft)
  boy.addAnimation("walkingL", boyWalkingLeft)
  boy.debug = true

  button = createButton('Rules');
  button.position(20, 20);
  //button.mousePressed(changeBG);
  button.size(100, 50)

  closeButton = createButton('Close Rules');
  closeButton.position(20, 85);
  //closeButton.mousePressed(closeRules);
  closeButton.size(100, 50)
  closeButton.hide();

  startButton = createImg('../assets/startbtn.png')
  startButton.position(width / 2 - 200, height / 2 + 100);
  startButton.size(400, 200)
  //startButton.mouseClicked(changeState)

  paper = createSprite(width / 2, height / 2, 30, 30)
  paper.visible = false
  paper.addImage('rules', rules)

  hotel = createSprite(width - 100, height / 2, 50, 50)
  hotel.addImage("hotel", hotel_image)
  hotel.scale = 0.3
  hotel.debug = true
  hotel.setCollider('rectangle', -130, 0, 500, 500)

  reception = createSprite(width / 2, height / 2, 30, 30)
  reception.shapeColor = "green"
  reception.visible = false


  guestbook = createSprite(width / 2 + 100, height / 2, 20, 20)
  guestbook.visible = false
  guestbook.addImage("guestbook", guestbook_image)
  guestbook.scale = 0.5
  guestbook.debug = true
  guestbook.setCollider("rectangle", 0, 0, 30, 30)

  hiddenRoom = createSprite(width - 100, height / 2, 20, 20)
  hiddenRoom.visible = false
  hiddenRoom.addImage(hiddenRoom_image)

  lockpick = createSprite(300, height / 2 + 110, 20, 20)
  lockpick.visible = false

  endOfReception = createSprite(width, height / 2, 20, 120)
  endOfReception.shapeColor = 'brown'

  basement = createSprite(endOfReception.x, endOfReception.y, 40, 40)
  basement.addImage("basement", basement_image)
  basement.visible = false

  text1 = createSprite(width / 2, height / 2, 40, 40)
  text1.visible = false
  text1.addImage("text1", txt1_image)


  // Create key
  lockkey_1 = createSprite(random(width), random(height), 20, 20);
  lockkey_1.shapeColor = "yellow";
  lockkey_1.addImage("lockkey1", keyImg)
  lockkey_1.scale = 0.005
  lockkey_1.debug = true

  drawSprites();
}

function draw() {
  background("yellow")

  if (gameState == "Splash") {
    SplashScreen()
  }
  else if (gameState == "Forest") {
    ForestScreen()
  }
  else if (gameState == "Reception") {
    ReceptionScreen()
  }
  else if (gameState == "Room_Selection") {
    RoomSelectionScreen()
  }
  else if (gameState == "Room") {
    HotelRoomScreen()
  }
  else if (gameState == "BaseMent") {
    BaseMentScreen()
  }

  // Move the boy left and right
  if (keyDown('d')) {
    boy.changeAnimation("walkingR", boyWalkingRight)
    boy.x = boy.x + 7
    boy.scale = 1
  }
  if (keyDown('a')) {
    boy.changeAnimation("walkingL", boyWalkingLeft)
    boy.x = boy.x - 7
    boy.scale = 0.15
  }
  if (keyDown('w')) {
    boy.changeAnimation("walkingL", boyWalkingLeft)
    boy.y = boy.y - 7
    boy.scale = 0.15
  }
  if (keyDown('s')) {
    boy.changeAnimation("walkingL", boyWalkingLeft)
    boy.y = boy.y + 7
    boy.scale = 0.15
  }

  drawSprites()
}

function SplashScreen() {
  background(mystery_image)
  // Hide the boy and hotel sprites
  boy.visible = false;
  hotel.visible = false;
  startButton.mouseClicked(function () {
    gameState = "Forest"
    startButton.hide()
  })

  drawSprites()
}

function ForestScreen() {
  background(bgImg)
  // Hide the boy and hotel sprites
  boy.visible = true;
  hotel.visible = true;
  if (boy.overlap(hotel)) {
    gameState = "Reception";
  }
  drawSprites()
}

function ReceptionScreen() {
  background(reception_bg)
  hotel.visible = false
  boy.visible = true;
  lockkey_1.visible = true;
  guestbook.visible = true



  if (boy.overlap(guestbook)) {
    lockkey_1.visible = true
    text1.visible = true
    boy.x = width / 2 + 400

    setTimeout(function () {
      text1.visible = false
    }, 2000)
  }

  // Check if player collects the key
  if (boy.overlap(lockkey_1)) {
    console.log("key collected")
    lockkey_1.visible = false
    setTimeout(function () {
       lockkey_1.remove()
    }, 1000)

    isUnlocked = true;
  }

  // Check if player unlocks the room
  if (isUnlocked && boy.overlap(endOfReception)) {
    gameState = "Room_Selection";
  }



  if (!isUnlocked && boy.overlap(endOfReception)) {
    dialogue("You dont have the key !!! ")
  }






  drawSprites();

}

function RoomSelectionScreen() {
  background()
}

function HotelRoomScreen() {
}

function BaseMentScreen() {
}


function dialogue(text) {
  console.log(text);
}


