class Shaurma {
    constructor(ctx, maxY) {
        this.img = new Image();
        this.img.src = "assets/img/shaurma.png";
        this.ctx = ctx;
        this.x = 300;
        this.y = 150;
        this.width = 21;
        this.height = 38;
        this.Shaurma_flag = false;
        this.vy = SPEED
        this.vx = SPEED
        this.maxY = maxY
        this.turn = true

    
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
        )
    }

    move() {
        if(this.turn) {
            this.x += this.vx
        }
        else if(!this.turn) {
            this.x -= this.vx;
        }
         if(this.y <= 10) {
             this.y += this.vy

         }
        this.y -= this.vy
        this.vy -= GRAVITY
    
        if (this.y >= 450) {
          this.vy *= -1;
        }
        if(this.x >= 1200) {
            this.turn = false;
        }
        else if(this.x <= 10) {
            this.turn = true;
        }
        
    }

}