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

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    this.checkCollisions();
    this.gamePoints();
    this.gameOver();
    document.getElementById("score").innerHTML = "Score: " + this.score + "\n\rLives: " + this.lives;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

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

Player.prototype.gamePoints = function() {
    if(this.y < -50) {
        //alert("You win!");
        this.score += 100;
        this.reset();

    }
};

Player.prototype.gameOver = function() {
    if(this.lives === 0) {
        this.score = 0;
        this.lives = 3;
        alert("Game over!");
        location.reload();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();

//A function for setting random x and y coordinates
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
};

//A star object
var Star = function() {
    this.sprite = 'images/Star.png';

    //this.x = (Math.floor((Math.random() * 3) + 1))*101;
    //this.y = (Math.floor((Math.random() * 3) + 1))*76;

    const starX = [15,115,215,315,415];
    const starY = [105,185,265];

    this.x = starX.randomElement();
    this.y = starY.randomElement();
};

Star.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75, 125);
};

Star.prototype.update = function() {
  if(this.x <= player.x + 40 &&
     this.x + 40 >= player.x &&
     this.y <= player.y + 40 &&
     40 + this.y >= player.y) {
       this.constructor('hidden');
       player.score += 100;
      }
};

var star = new Star();

//A heart object
var Heart = function() {
    this.sprite = 'images/Heart.png';

    //this.x = (Math.floor((Math.random() * 3) + 1))*101;
    //this.y = (Math.floor((Math.random() * 3) + 1))*76;
    const heartX = [15,115,215,315,415];
    const heartY = [120,200,280];

    this.x = heartX.randomElement();
    this.y = heartY.randomElement();
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75, 105);
};

Heart.prototype.update = function() {
  if(this.x <= player.x + 40 &&
     this.x + 20 >= player.x &&
     this.y <= player.y + 40 &&
     20 + this.y >= player.y) {
       this.constructor('hidden');
       player.lives += 1;
      }
};

var heart = new Heart();

/**
var stone = new Image();
stone.src = 'images/Star.png';
stone.onload = function() {
ctx.drawImage(stone, 115,120);
}
**/

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
