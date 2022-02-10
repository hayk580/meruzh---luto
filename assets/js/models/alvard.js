class Alvard {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y

    this.sprite = new Image()
    this.sprite.src = './assets/img/tati.png'
    // this.sprite.src = './assets/img/enemy_seed2.png'
    this.sprite.isReady = false
    this.stop = false
    this.sprite.horizontalFrames = 4
    this.sprite.verticalFrames = 4
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 2
    this.sprite.drawCount = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }

    this.movements = {
      right: true
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      this.sprite.drawCount++
      this.animate()
    }
  }

  animate() {
    if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0
      } else {
        this.sprite.horizontalFrameIndex++
      }
      this.sprite.drawCount = 0
    }
  }

  move() {
    if (stop === false) {
      this.x = 0
      alert("hello")
    }
    else {
      this.x -= ALVARDSPEED

    }
  }


  moveRigth() {
    if (this.movements.right) {
      this.x -= SPEED
    }
    if (stop === false) {
      this.x = 0

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

