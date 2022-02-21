class Paper {
    constructor(ctx, x, y) {
      this.ctx = ctx
  
      this.x = x
      this.y = y + 65
  
      this.sprite = new Image()
      this.tuxt = new Image()
      this.tuxt.src = './assets/img/open-tuxt.png'
      this.sprite.src = './assets/img/paper.png'
      // this.sprite.src = './assets/img/enemy_seed2.png'
      this.sprite.isReady = false
      this.sprite.horizontalFrames = 4
      this.sprite.verticalFrames = 1
      this.sprite.horizontalFrameIndex = 0
      this.sprite.verticalFrameIndex = 0
      this.sprite.drawCount = 0
      this.sprite.onload = () => {
        this.sprite.isReady = true
        this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
        this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
        this.width = this.sprite.frameWidth
        this.height = this.sprite.frameHeight
      }
  
      this.movements = {
        right: false
      }
    }
  
    isReady() {
      return this.sprite.isReady
    }
  
    draw() {
      if (this.isReady()) {
        this.ctx.drawImage(
          this.sprite,
          0,
          0,
          50,
          this.sprite.frameHeight,
          this.x,
          this.y,
          30,
          30
        )
        this.sprite.drawCount++
        // this.animate()
      }
    }
  
    animate(marioX, marioY) {
        this.ctx.drawImage(
            this.tuxt,
            0,
            0,
            200,
            100,
            marioX,
            marioY - 150,
            200,
            150
          )
    }
  
    move(marioX) {
      if (this.movements.right && marioX >= 670) {
        this.x -= SPEED
      }
    }
  
    onKeyEvent(event) {
      const status = event.type === 'keydown'
  
      switch (event.keyCode) {
        case KEY_RIGHT:
          this.movements.right = status
          break;
      
        default:
          break;
      }
    }
  }