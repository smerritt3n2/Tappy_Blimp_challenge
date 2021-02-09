/*====================================================================
 *  Blimp Settings & Behaviour changes
 ===================================================================*/
 class Blimp {
    constructor (x, y, w, h, c) {
      this.x = 150;
      this.y = 0;
      this.vy = 0;
      this.w = w;
      this.h = h;
      this.c = c;
  
      this.dy = 0;
      this.floatForce = 15;
      this.originalHeight = h;
      this.grounded = false;
      this.floatTimer = 0;
    }
  
    Animate () {
      if (keys['Space'] || keys['KeyW']) {
        this.float();
      } else {
        this.floatTimer = 0;
      }
  
      this.y += this.dy;
  
      if (this.y + this.h < canvas.height) {
        this.dy += gravity;
        this.grounded = false;
      } else {
        this.dy = 0;
        this.grounded = true;
        this.y = canvas.height - this.h;
      }
  
      this.Draw();
    }
  
    /*====================================================================
    *  When triggered, move Blimp object up
    ===================================================================*/
    float () {
      if (this.y < 0 + this.height) {
        this.y = canvas.height;
        
      } else {
          this.floatTimer = 10;
          this.dy = -this.floatForce - (this.floatTimer / 50);
      }
    }
    /*====================================================================
    ===================================================================*/
  
    Draw () {
        const blimpSprite = new Image();
        blimpSprite.src = 'img/blimp_player.png';
    
        ctx.beginPath();
        ctx.fillStyle = this.c;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(blimpSprite, this.x, this.y, this.w, this.h);
        ctx.closePath();  
    }
  }
  /*====================================================================
   ===================================================================*/
   blimp = new Blimp(25, 0, 150, 100);