const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

/*====================================================================
 *  Global Variables for all functions
 ===================================================================*/
let score;
let scoreText;
let highscore;
let highscoreText;
let blimp;
let gravity;
let clouds = [];
let gameSpeed;
let keys = {};
let endGame = false;
/*====================================================================
 ===================================================================*/

/*====================================================================
*  Event Listeners, When button is clicked trigger function
 ===================================================================*/
document.addEventListener('keydown', function (evt) {
  keys[evt.code] = true;
  begin();
});

document.addEventListener('keyup', function (evt) {
  keys[evt.code] = false;
});
/*====================================================================
 ===================================================================*/


/*====================================================================
*  Total Score Settings & Behaviour changes
 ===================================================================*/
class Text {
  constructor (t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}
/*====================================================================
 ===================================================================*/

/*====================================================================
*  Core Game Functions & Behaviour changes
 ===================================================================*/
function Spawncloud () {
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let cloud = new Cloud(canvas.width + size, canvas.height - size, size, size, '#2484E4');

  if (type == 1) {
    cloud.y -= blimp.originalHeight - 10;
  }
  clouds.push(cloud);
}


function RandomIntInRange (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start () {
  canvas.width = 1024;
  canvas.height = 768;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highscore = 0;
  if (localStorage.getItem('highscore')) {
    highscore = localStorage.getItem('highscore');
  }

  

  scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
  highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");

  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
function Update () {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawnTimer--;
  if (spawnTimer <= 0) {
    Spawncloud();
    console.log(clouds);
    spawnTimer = initialSpawnTimer - gameSpeed * 8;
    
    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }

  /*====================================================================
  * Spawns Clouds into program
  ===================================================================*/
  for (let i = 0; i < clouds.length; i++) {
    let o = clouds[i];

    if (o.x + o.w < 0) {
      clouds.splice(i, 1);
    }

    if ( /* If Blimp is touched by Cloud, trigger end game */
      blimp.x < o.x + o.w &&
      blimp.x + blimp.w > o.x &&
      blimp.y < o.y + o.h &&
      blimp.y + blimp.h > o.y
    ) {
      clouds = [];
      score = 0;
      spawnTimer = initialSpawnTimer;
      gameSpeed = 3;
      window.localStorage.setItem('highscore', highscore);
      endGame = true;
      while (endGame == true) { /* Reveals Game Over Screen with players results */
        document.getElementById("finish").classList.remove("hide");
        document.getElementById("results").innerHTML = curScore;
        endGame = false;
      }
    }

    o.Update(); 
  }
  /*====================================================================
  ===================================================================*/

  blimp.Animate();

  score++;
  scoreText.t = "Score: " + score;
  scoreText.Draw();
  curScore = score;

  if (score > highscore) {
    highscore = score;
    highscoreText.t = "Highscore: " + highscore;
  }
  
  highscoreText.Draw();

  gameSpeed += 0.010;
}
/*====================================================================
 ===================================================================*/

/*====================================================================
* Event Handler for form Interactions
===================================================================*/
function begin() {
  document.getElementById("start").classList.add("hide");
}

function tryAgain() {
  document.getElementById("finish").classList.add("hide");
}
/*====================================================================
 ===================================================================*/

Start();