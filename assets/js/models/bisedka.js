class Bisetka {
    constructor(ctx, x, y) {
        this.ctx = ctx
    
        this.x = x
        this.y = y
    
        this.sprite = new Image()
        this.sprite.src = './assets/img/besetka-01.png'
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
                this.x,
                this.y,
                200,
                200
            )
        }
    }

    move(marioX) {
        if (this.movements.right && marioX >= 670) {
            this.x -= 3
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