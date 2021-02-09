/*====================================================================
*  Cloud Settings & Behaviour changes
 ===================================================================*/
 class Cloud {
    constructor (x, y, w, h, c) {
      this.x = x;
      this.y = Math.floor(Math.random() * (canvas.height - 25));
      this.w = w;
      this.h = h;
      this.c = c;
  
      this.dx = -gameSpeed;
    }
  
    Update () {
      this.x += this.dx;
      this.Draw();
      this.dx = -gameSpeed;
    }
  
    Draw () {
      const cloudSprite = new Image();
      cloudSprite.src = 'img/cloud.png';
  
      ctx.beginPath();
      ctx.fillStyle = this.c;
      // ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.drawImage(cloudSprite, this.x, this.y, this.w + 100, this.h + 100);
      ctx.closePath();
    }
  }
  /*====================================================================
   ===================================================================*/