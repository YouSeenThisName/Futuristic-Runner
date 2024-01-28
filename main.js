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

    this.healthBar
    this.healthText

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
    this.shot1
    this.shot2
    this.shot3

    // makes variables for the flying bots
    this.goingUp = true
    this.goingDown = false

    // make variables for the following bot
    this.followBot1

    // make variables for the rooms
    this.room1 = true
    this.room2 = false
    this.room3 = false
    this.room4 = false
    this.room5 = false
    this.room6 = false
  }

  preload(){
    this.load.image("bg", "/assets/futuristic-bg.png")
    this.load.image("player", "/assets/futuristic-player.png")
    this.load.image("flyer", "/assets/evilFlyBot.png")
    this.load.image("bg2", "/assets/second-futuristic-bg.png")
    this.load.image("shooter", "/assets/shooterRobot.png")
    this.load.image("follow", "/assets/followBot.png")
  }

  createFlyBot(x, y){
    const flyBot = this.add.image(x, y, "flyer")
    flyBot.setScale(0.25)
    return flyBot
  }

  createShooterBot(x, y){
    const shooterBot = this.add.image(x, y, "shooter")
    shooterBot.setScale(0.25)
    return shooterBot
  }

  createFollowBot(x, y){
    const followBot = this.add.image(x, y, "follow")
    followBot.setScale(0.25)
    return followBot
  }

  create(){
    // Creates the background and scales it down
    this.bg = this.add.image(320, 180, "bg")
    this.bg.setScale(0.5)

    // Creates fly bots
    this.flyBot1 = this.createFlyBot(125, 180)
    this.flyBot2 = this.createFlyBot(225, 180)
    this.flyBot3 = this.createFlyBot(325, 180)
    this.flyBot4 = this.createFlyBot(425, 180)
    this.flyBot5 = this.createFlyBot(525, 180)
    
    // Creates the player and scales it down
    this.player = this.add.image(20,250,"player")
    this.player.setScale(0.35)

    // add the collidable objects to the list

    // Creates the cursors
    this.cursors = this.input.keyboard.createCursorKeys()

    // Create a health bar
    this.healthBar = this.add.graphics()
    this.healthText = this.add.text(100, 305, "Health", {font: "32px monospace", fill: "#000000"})
    this.healthBar.fillStyle(0x00ff00)
    this.healthBar.lineStyle(4, 0x000000)
    this.healthBar.fillRect(25, 295, 250, 50)
    this.healthBar.strokeRect(25, 295, 250, 50)

    // play button background
    this.playButtonBackground = this.add.graphics()
    this.playButtonBackground.fillStyle(0x000000)
    this.playButtonBackground.fillRect(0, 0, sizes.width, sizes.height)

    // Create a play button
    this.playButton = this.add.graphics()
    this.playButton.fillStyle(0x000000);
    this.playButton.lineStyle(4, 0x00ff00);
    this.playButton.fillRect(220, 215, 200, 80);
    this.playButton.strokeRect(220, 215, 200, 80);
    this.playButtonText = this.add.text(320, 255, 'Play', {font: '32px monospace', fill: '#00FF00',});
    this.playButtonText.setOrigin(0.5);

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
      this.enabled = true
    }
  }

  moveFlyBot(flyingBot) {
    if (this.enabled) {
      if (this.goingUp) {
        flyingBot.y -= 250 * this.game.loop.delta / 1000;
  
        // Check if flyingBot is out of bounds on the top side, then move it down
        if (flyingBot.y <= 10) {
          flyingBot.y = 10;
          this.goingDown = true;
          this.goingUp = false;
        }
      }
  
      if (this.goingDown) {
        flyingBot.y += 250 * this.game.loop.delta / 1000;
  
        // Check if flyingBot is out of bounds on the bottom side, then move it up
        if (flyingBot.y >= 350) {
          flyingBot.y = 350;
          this.goingDown = false;
          this.goingUp = true;
        }
      }
    }
  }

  shootShooterBot(bullet) {
    if (this.enabled && this.room2) {
      bullet.y += 300 * this.game.loop.delta / 1000
      if (bullet.y >= 600){
        bullet.y = 80
      }
    }
  }

  followFollowBot(followingBot){
    if (this.enabled && this.room3) {
      // Calculate the direction vector from the bot to the player
      const directionX = this.player.x - followingBot.x;
      const directionY = this.player.y - followingBot.y;

      // Normalize the direction vector
      const length = Math.sqrt(directionX ** 2 + directionY ** 2);
      const normalizedDirectionX = directionX / length;
      const normalizedDirectionY = directionY / length;

      // Move the following bot towards the player
      const speed = 150; // Adjust the speed as needed
      followingBot.x += normalizedDirectionX * speed * this.game.loop.delta / 1000;
      followingBot.y += normalizedDirectionY * speed * this.game.loop.delta / 1000;

      if (this.player.x < followingBot.x){
        followingBot.setFlipX(false)
      }
      else{
        followingBot.setFlipX(true)
      }
    }
  }

  switchLevel(){
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
      this.shooterBot1 = this.createShooterBot(225, 35)
      this.shooterBot2 = this.createShooterBot(325, 35)
      this.shooterBot3 = this.createShooterBot(425, 35)
  
      // create the bullets
      this.shot1 = this.add.circle(225, 80, 10, 0xff0000)
      this.shot2 = this.add.circle(325, 80, 10, 0xff0000)
      this.shot3 = this.add.circle(425, 80, 10, 0xff0000)
  
      // destroys fly bots
      this.flyBot3.destroy()
      this.flyBot4.destroy()
      this.flyBot5.destroy()

      // reset the player position
      this.player.x = 20
      this.player.y = 250
    }

    if (this.room2 && this.player.x >= 625){
      this.room2 = false
      this.room3 = true
      this.flyBot2.destroy()
      this.flyBot1.destroy()
      this.shooterBot1.destroy()
      this.shooterBot2.destroy()
      this.shooterBot3.destroy()
      this.shot1.destroy()
      this.shot2.destroy()
      this.shot3.destroy()
      this.player.x = 20
      this.player.y = 250
      this.followBot1 = this.createFollowBot(590, 180)
    }

    this.player.setDepth(1)
    this.healthBar.setDepth(1)
    this.healthText.setDepth(1) 
    this.playButtonBackground.setDepth(1)
    this.playButton.setDepth(1)
    this.playButtonText.setDepth(1)
    this.menuText.setDepth(1)
    
  }

  checkFlyingBotCollisions() {
    const playerCenterX = this.player.x;
    const playerCenterY = this.player.y;
    const collisionRadius = 2;
  
    const flyBots = [this.flyBot1, this.flyBot2, this.flyBot3, this.flyBot4, this.flyBot5];
  
    for (const flyBot of flyBots) {
      const flyBotCenterX = flyBot.x;
      const flyBotCenterY = flyBot.y;
  
      // Calculate the distance between the player and the flyBot
      const distance = Phaser.Math.Distance.Between(playerCenterX, playerCenterY, flyBotCenterX, flyBotCenterY);
  
      // Check if the distance is less than the sum of the radii (collision)
      if (distance < collisionRadius + flyBot.displayWidth / 2) {
        this.player.x += 100 * this.game.loop.delta / 1000
        // Clear the previous fill and set a new fill color (e.g., red)
        this.healthBar.clear();
        this.healthBar.fillStyle(0xFF0000);
        this.healthBar.lineStyle(4, 0x000000);
        this.healthBar.fillRect(25, 295, 250, 50);
        this.healthBar.strokeRect(25, 295, 250, 50);
      }
    }
  }

  update(){
    this.movement()
    this.checkMouse()
    this.moveFlyBot(this.flyBot1)
    this.moveFlyBot(this.flyBot2)
    this.moveFlyBot(this.flyBot3)
    this.moveFlyBot(this.flyBot4)
    this.moveFlyBot(this.flyBot5)
    this.shootShooterBot(this.shot1)
    this.shootShooterBot(this.shot2)
    this.shootShooterBot(this.shot3)
    this.switchLevel()
    this.followFollowBot(this.followBot1)
    this.checkFlyingBotCollisions()
  }
}

const config = {
  type:Phaser.WEBGL,
  width:sizes.width,
  height:sizes.height,
  canvas:gameCanvas,
  scene:[GameScene]
}

const game = new Phaser.Game(config)
