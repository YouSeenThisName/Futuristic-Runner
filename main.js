// Imports
import './style.css'
import Phaser from 'phaser'

// Constants
const sizes = {
  width:640,
  height:360,
}

// Starts the main class which is a subclass of the scene
class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    // self.player (python)
    this.player

    // self.cursors
    this.cursors

    // self.playerSpeed (Allows us to use these variables throughout the class)
    this.playerSpeed = 200

    // make a varialbe to check if the game is enabled
    this.enabled = false

    // make a variable for the play button and play button text
    this.playButton
    this.playButtonText

    // make a variable for the play button background
    this.playButtonBackground

    // make a variable for the menu text
    this.menuText

    // make variables for the flybots
    this.flyBot1
    this.flyBot2
    this.flyBot3
    this.flyBot4
    this.flyBot5

    // make variables for the shooter bots
    this.shooterBot1
    this.shooterBot2
    this.shooterBot3
    this.shooterUp = false
    this.shooterDown = true

    // makes variables for the flying bots
    this.goingUp = true
    this.goingDown = false

    // make variables for the following bot
    this.followBot1

    // make variables for the rooms
    this.room1 = true
    this.room2 = false
    this.room3 = false

    // make variables to see if the objects can move
    this.flymove = true

    // make a variable for the questionaire
    this.questionsOn = true

    // correct / incorrect
    this.correct = 0
    this.incorrect = 0
  }

  preload(){
    // load the images

    // the bgs 
    this.load.image("bg", "/assets/futuristic-bg.png")
    this.load.image("bg2", "/assets/second-futuristic-bg.png")

    // the player
    this.load.image("player", "/assets/futuristic-player.png")

    // the robots
    this.load.image("flyer", "/assets/evilFlyBot.png")
    this.load.image("shooter", "/assets/shooterRobot.png")
    this.load.image("follow", "/assets/followBot.png")
  }

  createFlyBot(x, y){
    // Creates the fly bots
    const flyBot = this.add.image(x, y, "flyer")
    flyBot.setScale(0.25)
    return flyBot
  }

  createShooterBot(x, y){
    // Creates the shooter bots
    const shooterBot = this.add.image(x, y, "shooter")
    shooterBot.setScale(0.25)
    return shooterBot
  }

  createFollowBot(x, y){
    // Creates the follow bots
    const followBot = this.add.image(x, y, "follow")
    followBot.setScale(0.25)
    return followBot
  }

  create(){
    // Creates the background and scales it down
    this.bg = this.add.image(320, 180, "bg")
    this.bg.setScale(0.5)

    // Creates the fly bots
    this.flyBot1 = this.createFlyBot(125, 180)
    this.flyBot2 = this.createFlyBot(225, 180)
    this.flyBot3 = this.createFlyBot(325, 180)
    this.flyBot4 = this.createFlyBot(425, 180)
    this.flyBot5 = this.createFlyBot(525, 180)
    
    // creates the bullet bots
    this.shooterBot1 = this.createShooterBot(225, 35)
    this.shooterBot2 = this.createShooterBot(325, 35)
    this.shooterBot3 = this.createShooterBot(425, 35)
    this.shooterBot1.visible = false
    this.shooterBot2.visible = false
    this.shooterBot3.visible = false

    // creates the follow bot
    this.followBot1 = this.createFollowBot(-100, 180)
    this.followBot1.visible = false

    // Creates the player and scales it down
    this.player = this.add.image(20,250,"player")
    this.player.setScale(0.35)

    // Creates the cursors
    this.cursors = this.input.keyboard.createCursorKeys()

    // play button background
    this.playButtonBackground = this.add.graphics()
    this.playButtonBackground.fillStyle(0x000000)
    this.playButtonBackground.fillRect(0, 0, sizes.width, sizes.height)

    // Create a play button
    this.playButton = this.add.graphics()
    this.playButton.fillStyle(0x000000)
    this.playButton.lineStyle(4, 0x00ff00)
    this.playButton.fillRect(220, 215, 200, 80)
    this.playButton.strokeRect(220, 215, 200, 80)
    this.playButtonText = this.add.text(320, 255, 'Play', {font: '32px monospace', fill: '#00FF00',})
    this.playButtonText.setOrigin(0.5)

    // Create menu text
    this.menuText = this.add.text(143, 25, "Futuristic\n  Runner", {font: '64px monospace', fill: '#00FF00'})
  }

  movement(){
    if (this.enabled){
      // Moves the character up
      if (this.cursors.up.isDown && this.player.y > 60){
        this.player.y -= this.playerSpeed * this.game.loop.delta / 1000
      }

      // Moves the character down
      if (this.cursors.down.isDown && this.player.y < 345){
        this.player.y += this.playerSpeed * this.game.loop.delta / 1000
      }

      // Moves the character left and changes its flip
      if (this.cursors.left.isDown && this.player.x > 15){
        this.player.x -= this.playerSpeed * this.game.loop.delta / 1000
        this.player.setFlipX(true)
      }

      // Moves the character right and changes its flip
      if (this.cursors.right.isDown && this.player.x < 625){
        this.player.x += this.playerSpeed * this.game.loop.delta / 1000
        this.player.setFlipX(false)
      }
    }
  }

  checkMouse(){
    // creates a pointer
    const pointer = this.input.activePointer

    // If the pointer is on the button and is clicked
    if (pointer.isDown && pointer.x < 420 && pointer.x > 220 && pointer.y < 275 && pointer.y > 215 && this.enabled == false) {
      // Change visibilites and enable the game
      this.playButton.visible = false
      this.playButtonText.visible = false
      this.playButtonBackground.visible = false
      this.menuText.visible = false
      this.room1 = true
      this.enabled = true
    }
  }

  moveFlyBot(flyingBot) {
    // Moves the flying bot
    if (this.enabled && this.flymove) {
      // If the game is enabled and the bot is going up
      if (this.goingUp) {
        // make the bot go up
        flyingBot.y -= 250 * this.game.loop.delta / 1000
  
        // Check if flyingBot is out of bounds on the top side, then move it down
        if (flyingBot.y <= 10) {
          flyingBot.y = 10;

          // Change the boolean vals
          this.goingDown = true
          this.goingUp = false
        }
      }
  
      if (this.goingDown) {
        // If goingDown is true, make the flyingbot go down
        flyingBot.y += 250 * this.game.loop.delta / 1000
  
        // Check if flyingBot is out of bounds on the bottom side, then move it up
        if (flyingBot.y >= 350) {
          // Reset the flyingbots position
          flyingBot.y = 350

          // Reset the bool values
          this.goingDown = false
          this.goingUp = true
        }
      }
    }
  }

  shootShooterBot(bullet) {
    // Shoots the bullets from the shooter bot
    if (this.enabled && this.room2) {
      // If the room is number 2 and the game is enabled

      // Make the bullets go down/up
      if (this.shooterDown){
        bullet.y += 300 * this.game.loop.delta / 1000}
      
      if (this.shooterUp){
        bullet.y -= 300 * this.game.loop.delta / 1000}
      
      // Reset the position
      if (bullet.y >= 500){
        bullet.y = 500
        this.shooterUp = true
        this.shooterDown = false
      }
      
      if (bullet.y <= 60){
        bullet.y = 80
        this.shooterDown = true
        this.shooterUp = false
      }

    }
  }

  followFollowBot(followingBot){
    // Create the following bot
    if (this.enabled && this.room3) {
      // Calculate the direction vector from the bot to the player
      const directionX = this.player.x - followingBot.x
      const directionY = this.player.y - followingBot.y

      // Normalize the direction vector
      const length = Math.sqrt(directionX ** 2 + directionY ** 2)
      const normalizedDirectionX = directionX / length
      const normalizedDirectionY = directionY / length

      // Move the following bot towards the player
      const speed = 150
      followingBot.x += normalizedDirectionX * speed * this.game.loop.delta / 1000
      followingBot.y += normalizedDirectionY * speed * this.game.loop.delta / 1000

      // Flip the bot based on it's direction
      if (this.player.x < followingBot.x){
        followingBot.setFlipX(false)
      }
      else{
        followingBot.setFlipX(true)
      }
    }
  }

  switchLevel(){
    // Switches the levels
    if (this.room1 && this.player.x > 625){
      this.room1 = false
      this.room2 = true

      // Creates the background and scales it up
      this.bg = this.add.image(320, 180, "bg2")
      this.bg.setScale(2.6)

      // Creates fly bots
      this.flyBot1 = this.createFlyBot(125, 180)
      this.flyBot2 = this.createFlyBot(525, 180)
  
      // Creates new bots
      this.shooterBot1.visible = true
      this.shooterBot2.visible = true
      this.shooterBot3.visible = true
      this.shooterBot1.setDepth(1)
      this.shooterBot2.setDepth(1)
      this.shooterBot3.setDepth(1)
    
      // destroys fly bots
      this.flyBot3.x = -100
      this.flyBot4.x = -100
      this.flyBot5.x = -100

      // reset the player position
      this.player.x = 20
      this.player.y = 250
    }

    // If the room is 2 and the player has successfully completed the level
    outerif:
    if (this.room2 && this.player.x >= 625){
      // Change the bool vals
      this.room2 = false
      this.room3 = true
      this.flymove = false

      // Destroy the remaining flying bots
      this.flyBot2.setDepth(1)
      this.flyBot1.setDepth(1)
      this.flyBot1.y = 180
      this.flyBot2.y = 180

      // destroy the shooter bots
      this.shooterBot1.setDepth(1)
      this.shooterBot2.setDepth(1)
      this.shooterBot3.setDepth(1)
      this.shooterBot1.y = 180
      this.shooterBot2.y = 180
      this.shooterBot3.y = 180

      // Reset the players position
      this.player.x = 20
      this.player.y = 250

      // Create a follwing bot that follows you
      this.followBot1.x = 590
      this.followBot1.visible = true
      this.followBot1.setDepth(1)
    }

    // Set the depth of the "top" variables
    this.player.setDepth(1)
    this.playButtonBackground.setDepth(1)
    this.playButton.setDepth(1)
    this.playButtonText.setDepth(1)
    this.menuText.setDepth(1)

    // question part
    if (this.room3 && this.player.x >= 625){
      // disable the game
      this.enabled = false

      // move the player to the back
      this.player.setDepth(0)
      this.flyBot2.setDepth(0)
      this.flyBot1.setDepth(0)
      this.shooterBot1.setDepth(0)
      this.shooterBot2.setDepth(0)
      this.shooterBot3.setDepth(0)
      this.followBot1.setDepth(0)

      // cover the screen in black
      const background = this.add.graphics()
      background.fillStyle(0x000000)
      background.fillRect(0, 0, sizes.width, sizes.height)

      // create the question display
      const questionRect = this.add.graphics()
      questionRect.fillStyle(0x000000)
      questionRect.lineStyle(4, 0x00ff00)
      questionRect.fillRect(70, 50, 500, 80)
      questionRect.strokeRect(70, 50, 500, 80)

      // create the answer choice displays
      const clickEnabled = true

      const answerboxA = this.add.graphics()
      answerboxA.fillStyle(0x000000)
      answerboxA.lineStyle(4, 0x00ff00)
      answerboxA.fillRect(40, 150, 20, 20)
      answerboxA.strokeRect(40, 150, 20, 20)
      this.add.text(70, 140, "a.", {font:"32px monospace", fill:"#00FF00"})
      const answerboxB = this.add.graphics()
      answerboxB.fillStyle(0x000000)
      answerboxB.lineStyle(4, 0x00ff00)
      answerboxB.fillRect(40, 200, 20, 20)
      answerboxB.strokeRect(40, 200, 20, 20)
      this.add.text(70, 190, "b.", {font:"32px monospace", fill:"#00FF00"})
      const answerboxC = this.add.graphics()
      answerboxC.fillStyle(0x000000)
      answerboxC.lineStyle(4, 0x00ff00)
      answerboxC.fillRect(40, 250, 20, 20)
      answerboxC.strokeRect(40, 250, 20, 20)
      this.add.text(70, 240, "c.", {font:"32px monospace", fill:"#00FF00"})
      const answerboxD = this.add.graphics()
      answerboxD.fillStyle(0x000000)
      answerboxD.lineStyle(4, 0x00ff00)
      answerboxD.fillRect(40, 300, 20, 20)
      answerboxD.strokeRect(40, 300, 20, 20)
      this.add.text(70, 290, "d.", {font:"32px monospace", fill:"#00FF00"})

      // create the 1st question
      this.add.text(90, 75, "What does AI stand for?", {font:"32px monospace", fill:"#00FF00"})
      this.add.text(125, 140, "Alright Indiana", {font:"32px monospace", fill:"#00FF00"})
      this.add.text(125, 190, "Andrew Info", {font:"32px monospace", fill:"#00FF00"})
      this.add.text(125, 240, "Artificial Intelligence", {font:"32px monospace", fill:"#00FF00"})
      this.add.text(125, 290, "Apple Intel", {font:"32px monospace", fill:"#00FF00"})

      // creates a pointer
      const pointer = this.input.activePointer

      // questions
      if (clickEnabled){
        if (pointer.isDown && 20 < pointer.x && pointer.x < 60 && pointer.y > 130 && pointer.y < 170){
          this.incorrect = 1
        }
        if (pointer.isDown && 20 < pointer.x && pointer.x < 60 && pointer.y > 180 && pointer.y < 220){
          this.incorrect = 1
        }
        if (pointer.isDown && 20 < pointer.x && pointer.x < 60 && pointer.y > 230 && pointer.y < 270){
          this.correct = 1
        }
        if (pointer.isDown && 20 < pointer.x && pointer.x < 60 && pointer.y > 280 && pointer.y < 320){
          this.incorrect = 1
        }
        }
      
      if (this.incorrect >= 1 || this.correct >= 1){
        const background2 = this.add.graphics()
        background2.fillStyle(0x000000)
        background2.fillRect(0, 0, sizes.width, sizes.height)
        if (this.incorrect >= 1){
          this.add.text(sizes.width/2 - 150, sizes.height/2, "Try again next time...", {font:"32px monospace", fill:"#FF0000"})
        }
        if (this.correct >= 1){
          this.add.text(sizes.width/2 - 150, sizes.height/2, "You Pass!", {font:"32px monospace", fill:"#00FF00"})
        }
      }
    }

  }

  checkFlyingBotCollisions() {
    // get the player position and collision radius
    const playerCenterX = this.player.x
    const playerCenterY = this.player.y
    const collisionRadius = 2
    
    // create a list of all the flybots
    const flyBots = [this.flyBot1, this.flyBot2, this.flyBot3, this.flyBot4, this.flyBot5]
    
    // Get the position of each flybot in a forloop
    for (const flyBot of flyBots) {
      const flyBotCenterX = flyBot.x
      const flyBotCenterY = flyBot.y
  
      // Calculate the distance between the player and the flyBot
      const distance = Phaser.Math.Distance.Between(playerCenterX, playerCenterY, flyBotCenterX, flyBotCenterY)
  
      // Check if the distance is less than the sum of the radii (collision)
      if (distance < collisionRadius + flyBot.displayWidth / 2) {
        // Make the player move to the right
        this.player.x += 100 * this.game.loop.delta / 1000

        // handle the hit
        this.handlePlayerHit()
      }
    }
  }

  checkBulletCollisions(bullet1, bullet2, bullet3) {
    // Get the player center x and y and the collision radius
    const playerCenterX = this.player.x
    const playerCenterY = this.player.y
    const collisionRadius = 2

    // Make a list of all the bullet shots
    const bullets = [bullet1, bullet2, bullet3]
    
    // For all the bullets in the list
    for (const shots of bullets) {

      // Calculate the distance between the player and the bullet
      const distance = Phaser.Math.Distance.Between(playerCenterX, playerCenterY, shots.x, shots.y)

      // Check if the distance is less than the sum of the radii (collision)
      if (distance < collisionRadius + shots.displayWidth / 2) {
        // make the player go to the right
        this.player.x += 100 * this.game.loop.delta / 1000

        // handle the hit
        this.handlePlayerHit()
      }
    }
  }


  checkFollowingCollisions() {
    // get the player coords
    const playerCenterX = this.player.x
    const playerCenterY = this.player.y
    const collisionRadius = 2

    // Calculate the distance between the player and the followBot
    const distance = Phaser.Math.Distance.Between(
        playerCenterX, playerCenterY,
        this.followBot1.x, this.followBot1.y
    );

    // Check if the distance is less than the sum of the radius of the collision + followingBot
    if (distance < collisionRadius + this.followBot1.displayWidth / 2) {
      // Handle collision with followBot (e.g., decrease player health)
      this.player.x += 100 * this.game.loop.delta / 1000
      this.followBot1.y = 0
      this.followBot1.x = 0
      this.handlePlayerHit()
    }
  }

  handlePlayerHit() {
    // handles the player hit
    // reset the player position
    this.player.x = 20;
    this.player.y = 250;
  }

  update(){
    // any updates put onto the screen
    this.movement()
    this.checkMouse()

    // move the fly bots
    this.moveFlyBot(this.flyBot1)
    this.moveFlyBot(this.flyBot2)
    this.moveFlyBot(this.flyBot3)
    this.moveFlyBot(this.flyBot4)
    this.moveFlyBot(this.flyBot5)

    // shoot the shooter bots
    this.shootShooterBot(this.shooterBot1)
    this.shootShooterBot(this.shooterBot2)
    this.shootShooterBot(this.shooterBot3)

    // switch the levels
    this.switchLevel()

    // follow bot
    this.followFollowBot(this.followBot1)

    // collision checker
    this.checkFlyingBotCollisions()
    this.checkBulletCollisions(this.shooterBot1, this.shooterBot2, this.shooterBot3)
    this.checkFollowingCollisions()

  } 
}

// configurate the web portion
const config = {
  type:Phaser.WEBGL,
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
  scene:[GameScene]
}

// create the game
const game = new Phaser.Game(config)
