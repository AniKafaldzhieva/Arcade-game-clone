// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = (Math.floor((Math.random() * 3) + 1))*70;
    this.speed = Math.random() + 2;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    if(this.x >= 500) {
        this.x = 0;
        this.y = (Math.floor((Math.random() * 3) + 1))*70;
    }
    // Move towards the player
    this.x += Math.cos(dt) * this.speed;
    //this.y += Math.sin(dt) * this.speed;
    if(player.score >= 1000){
        this.speed = Math.random() + 4;
    } else if (player.score >= 2000) {
        this.speed = Math.random() + 6;
    } 

    if(player.lives === 0) {
        this.freeze();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = (Math.floor((Math.random() * 3) + 1))*70;
    this.speed = Math.random() + 2;
    
};

Enemy.prototype.freeze = function() {
    this.speed = 0;

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png'
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.lives = 3;

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function() {
    this.checkCollisions();
    this.gamePoints();
    this.gameOver();

};

//Reset the player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};

//Check the collision with the enemies
Player.prototype.checkCollisions = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if(allEnemies[i].x <= this.x + 40 &&
            allEnemies[i].x + 40 >= this.x &&
            allEnemies[i].y <= this.y + 40 &&
            40 + allEnemies[i].y >= this.y) {
            this.reset();
            this.lives -= 1;
        }
    }

};

//Calculate game points
Player.prototype.gamePoints = function() {
    if(this.y < -50) {
        this.score += 100;
        this.reset();

    }

    let gameOverContent = document.getElementById('gameOver');
    gameOverContent.innerHTML = "Game over! \n\rYou finished with " + this.score +" points!";
    document.getElementById("score").innerHTML = "Score: " + this.score + "\n\rLives: " + this.lives;

};

//End of the game
Player.prototype.gameOver = function() {
    if (this.lives === 0) {
        showModal();

    }
    
};

//A star object
var Star = function() {
    this.sprite = 'images/Star.png';

    const starX = [15,115,215,315,415];
    const starY = [105,185,265];

    this.x = starX.randomElement();
    this.y = starY.randomElement();

    this.isActive = false;

};

// Draw the star on the screen
Star.prototype.render = function() {
  if (player.score === 200) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75, 125);
    this.isActive = true;

  }

};

Star.prototype.update = function() {
  if(this.x <= player.x + 40 &&
     this.x + 40 >= player.x &&
     this.y <= player.y + 40 &&
     40 + this.y >= player.y && this.isActive) {
       this.constructor('hidden');
       player.score += 100;
       this.isActive = false;

    }

};

//A heart constructor
var Heart = function() {
    this.sprite = 'images/Heart.png';

    //this.x = (Math.floor((Math.random() * 3) + 1))*101;
    //this.y = (Math.floor((Math.random() * 3) + 1))*76;

    const heartX = [15,115,215,315,415];
    const heartY = [120,200,280];

    this.x = heartX.randomElement();
    this.y = heartY.randomElement();

    this.isActive = false;

};

//The number of hearts
var count = 0;

// Draw the heart on the screen
Heart.prototype.render = function() {   
  if ((player.score === 500 || player.score === 1000 )&& count === 0) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75, 105);
      this.isActive = true;
      count = 0;

  }

};

Heart.prototype.update = function() {
    if(this.x <= player.x + 40 &&
        this.x + 40 >= player.x &&
        this.y <= player.y + 40 &&
        20 + this.y >= player.y && this.isActive) {
          this.constructor('hidden');
          player.lives += 1;
          count++;
          this.isActive = false;

    }

};

//A function for setting random x and y coordinates
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var firstEnemy = new Enemy();
var secondEnemy = new Enemy();
var thirdEnemy = new Enemy();
var fourthEnemy = new Enemy();

var allEnemies = [firstEnemy, secondEnemy, thirdEnemy, fourthEnemy];

var player = new Player();

//Create a star object
var star = new Star();

//A heart object
var heart = new Heart();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(key) {
    if(key == 'left')
    {
        if(this.x != 0)
           this.x -= 100;
    }
    if(key == 'right')
    {
        if(this.x != 400)
           this.x += 100;
    }
    if(key == 'up')
    {
        if(this.y != -50)
           this.y -= 80;
    }
    if(key == 'down')
    {
        if(this.y != 400)
           this.y += 80;
    }
};

//Create modal pop up
let modal = document.querySelector('.modal');
let restartButton = document.querySelector('.restart-button');

function showModal() {
  modal.style.display = "block";
  modal.classList.add('show-modal');
  
  document.removeEventListener('keyup');
  
}

function removeModal() {
  modal.style.display = "none";
  modal.classList.remove('show-modal');

  player.lives = 3;
  player.score = 0;

  allEnemies.forEach(element => {
    element.reset();
});

location.reload();

}

restartButton.addEventListener('click', removeModal);

//Close button
let closeButton = document.querySelector('.close');

closeButton.onclick = function() {
    modal.style.display = "none";
    modal.classList.remove('show-modal');
    
}
