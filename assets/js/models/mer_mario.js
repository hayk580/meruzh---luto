class Mario {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.minX = 0
    this.maxX = this.ctx.canvas.width / 2
    this.vx = 0

    this.y = y
    this.maxY = y
    this.vy = 0
    this.flag = 1

    this.width = 0
    this.height = 0
    this.turn = true
    this.pos++

    this.sprite = new Image()
    if (this.flag == 1) { this.sprite.src = './assets/img/meruzh.png' }
    if (this.flag == 0) { this.sprite.src = './assets/img/littlemeruzh.png' }
    if (this.flag == 2) { this.sprite.src = './assets/img/big-meruzh.png' }
    this.sprite.src = './assets/img/meruzh.png'
    this.sprite.isReady = false
    this.sprite.horizontalFrames = 4
    this.sprite.verticalFrames = 4
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
      up: false,
      down: false,
      right: false,
      left: false
    }

    this.isJumping = false
    this.isDie = false
    this.canFire = true

    this.bullets = []

    this.sounds = {
      fire: new Audio('./assets/sound/fireball.wav')
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  clear() {
    this.bullets = this.bullets.filter(bullet => bullet.x <= this.ctx.canvas.width)
  }

  draw() {
    if (this.isReady()) {
      if (this.flag == 0) { this.sprite.src = './assets/img/littlemeruzh.png' }
      if (this.flag == 1) { this.sprite.src = './assets/img/meruzh.png' }
      if (this.flag == 2) { this.sprite.src = './assets/img/big-meruzh.png' }
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
      this.bullets.forEach(bullet => bullet.draw())
      this.animate()
    }
  }

  onKeyEvent(event) {
    const status = event.type === 'keydown'
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status
        break;

      case KEY_DOWN:
        this.movements.down = status
        break;
      case KEY_RIGHT:
        this.movements.right = status
        break;
      case KEY_LEFT:
        this.movements.left = status
        break;
      case KEY_FIRE:
        if (this.canFire) {
          this.bullets.push(new Fireball(this.ctx, this.x + this.width, this.y, this.maxY + this.height))
          this.sounds.fire.currentTime = 0
          this.sounds.fire.play()
          this.canFire = false
          setTimeout(() => {
            this.canFire = true
          }, 500);
        }
        break;
      default:
        break;
    }
  }

  move() {
    this.bullets.forEach(bullet => bullet.move())

    if (this.movements.up && !this.isJumping) {
      this.isJumping = true
      this.vy = -9
    } else if (this.isJumping) {
      this.vy += GRAVITY
    }

    if (this.isDie) {
      this.isDie = true
      this.vy = -0.3
    }


    if (this.movements.down && !this.isSitting && this.isDie == false) {
      this.isSitting = true
    } else if (!this.movements.down) {
      // this.vy = this.vy
      this.isSitting = false

    }


    if (this.movements.right && this.isDie == false) {
      this.vx = SPEED
    } else if (this.movements.left && this.isDie == false) {
      this.vx = -SPEED
    } else {
      this.vx = 0
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x >= this.maxX) {
      this.x = this.maxX
    } else if (this.x <= this.minX) {
      this.x = this.minX
    }

    if (this.y >= this.maxY) {
      this.isJumping = false
      this.y = this.maxY
      this.vy = 0
    }

    if (this.y >= this.maxY) {
      this.isDie = false
      this.y = this.maxY
      this.vy = 0
    }

  }

  animate() {
    if (this.isJumping && this.isDie == false) {
      this.animateJump()
    }
    else if (this.movements.right && this.isDie == false) {
      this.turn = true
      this.animateRight()
    }
    else if (this.movements.left && this.isDie == false) {
      this.turn = false
      this.animateLeft()

    }
    else if (this.isDie) {
      this.animateDie()
    }
    else if (this.isSitting && this.isDie == false) {
      this.animateSitting()
    }
    else {
      this.resetAnimation()
    }
    
  }

  resetAnimation() {
    
    if (this.turn == true) {
      this.sprite.horizontalFrameIndex = 0
      this.sprite.verticalFrameIndex = 0
    }
    if (this.turn == false) {
      this.sprite.horizontalFrameIndex = 0
      this.sprite.verticalFrameIndex = 2
    }
  }

  animateJump() {
    if (this.turn == true) {


      this.sprite.verticalFrameIndex = 1
      this.sprite.horizontalFrameIndex = 0
    }
    if (this.turn == false) {
      this.count = 1


      this.sprite.verticalFrameIndex = 3
      this.sprite.horizontalFrameIndex = 0
    }
  }


  animateDie() {
    if (this.turn == true) {
      this.sprite.verticalFrameIndex = 1
      this.sprite.horizontalFrameIndex = 3
    }
    if (this.turn == false) {
      this.sprite.verticalFrameIndex = 3
      this.sprite.horizontalFrameIndex = 3
    }
  }




  animateSitting() {
    if (this.turn == true) {
      this.sprite.verticalFrameIndex = 1
      this.sprite.horizontalFrameIndex = 2
    }
    if (this.turn == false) {
      this.sprite.verticalFrameIndex = 3
      this.sprite.horizontalFrameIndex = 2
    }
  }


  animateRight() {
    if (this.sprite.verticalFrameIndex !== 0) {
      this.sprite.verticalFrameIndex = 0
      this.sprite.horizontalFrameIndex = 0
    } else if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0
      } else {
        this.sprite.horizontalFrameIndex++
      }
      this.sprite.drawCount = 0
    }
  }
  animateLeft() {
    if (this.sprite.verticalFrameIndex !== 2) {
      this.sprite.verticalFrameIndex = 2
      this.sprite.horizontalFrameIndex = 0
    } else if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0
      } else {
        this.sprite.horizontalFrameIndex++
      }
      this.sprite.drawCount = 0
    }

  }

 

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }


  collidesWithAlvard(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }




  collidesWithBlocks(element) {

    if (this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height + 10 &&
      this.y + this.height + 10 > element.y) {
      return "true"
    }
    else {
      return false
    }
  }

  collidesWithBag(element) {

    if (this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height  > element.y) {
      return "true"
    }
    else {
      return false
    }
  }
  collidesWithShaurma(element) {

    if (this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height  > element.y) {
      return "true"
    }
    else {
      return false
    }
  }
}