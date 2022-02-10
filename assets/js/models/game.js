class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1340
    this.canvas.height = 500
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1040 / 60
    this.drawInterval = undefined

    this.background = new Background(this.ctx)
    this.mario = new Mario(this.ctx, 50, this.canvas.height - 120)
    this.alvardTati = new Alvard()
    this.bichok = new Fireball()

    this.coins = [

      new Coin(this.ctx, this.mario.x + 400, this.mario.y + 10),
      new Coin(this.ctx, this.mario.x + 500, this.mario.y),
      new Coin(this.ctx, this.mario.x + 600, this.mario.y - 10),
      new Coin(this.ctx, this.mario.x + 700, this.mario.y - 20),
      new Coin(this.ctx, this.mario.x + 800, this.mario.y - 10),
      new Coin(this.ctx, this.mario.x + 900, this.mario.y),
      new Coin(this.ctx, this.mario.x + 1000, this.mario.y + 10),

    ]


    this.alvards = [

      new Alvard(this.ctx, this.mario.x + 500, this.mario.y),
      new Alvard(this.ctx, this.mario.x + 900, this.mario.y),

    ]



    this.polices = [
      // new Police(this.ctx, this.mario.x + 1100, this.mario.y),
      // new Police(this.ctx, this.mario.x + 1200, this.mario.y),
      // new Police(this.ctx, this.mario.x + 1300, this.mario.y)
    ]


    this.kims = [
      new Kim(this.ctx, this.mario.x + 2100, this.mario.y),
      new Kim(this.ctx, this.mario.x + 2400, this.mario.y),
    ]





    this.blocks = [

      // new Blocks(this.ctx, this.mario.x + 500, this.mario.y),
      // new Blocks(this.ctx, this.mario.x + 550, this.mario.y),

      // new Blocks(this.ctx, this.mario.x + 700, this.mario.y - 60),
      // new Blocks(this.ctx, this.mario.x + 750, this.mario.y - 60),



      // new Blocks(this.ctx, this.mario.x + 900, this.mario.y - 60),
      // new Blocks(this.ctx, this.mario.x + 950, this.mario.y - 60),



    ]

    let x = 0
    let y = 50

    for (let i = 0; i < 43; i++) {

      x += 400

      this.blocks.push(new Blocks(this.ctx, this.mario.x + x, this.mario.y - y))
    }

    console.log(this.blocks)

    this.points = 0
    this.pointsCoin = new Coin(this.ctx, 10, 10)
    const themMusic = './assets/sound/mw-theme.mp3'
    const theme = new Audio(themMusic)
    const theme2 = new Audio('./assets/sound/die.mp3')

    theme.volume = 0.1

    this.sounds = {
      theme,
      theme2,
      coin: new Audio('./assets/sound/coin.wav'),
      alvard: new Audio('./assets/sound/coin.wav'),
      die: new Audio('./assets/sound/die.mp3'),
      tati: new Audio('./assets/sound/tati.wav')
    }
  }

  start() {
    if (!this.drawInterval) {
      this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()
        this.alvards.forEach(alvard => alvard.move())
        this.polices.forEach(police => police.move())
        this.kims.forEach(kim => kim.move())

      }, this.fps);
    }


  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.background.draw()
    this.mario.draw()
    this.coins.forEach(coin => coin.draw())
    this.blocks.forEach(blocks => blocks.draw())
    this.alvards.forEach(alvards => alvards.draw())
    this.polices.forEach(polices => polices.draw())
    this.kims.forEach(kims => kims.draw())
    this.pointsCoin.draw()
    // this.alvards.forEach(alvards => alvards.move()) 

    this.ctx.save()
    this.ctx.font = '18px Arial'
    this.ctx.fillText(`միավորներ: ${this.points}`, 30, 25)
    this.ctx.restore()
  }

  move() {
    if (this.mario.x === this.mario.maxX) {
      this.background.move()
      this.coins.forEach(coins => coins.move())
      // this.alvards.forEach(alvards => alvards.stop = false)
      this.alvardTati.stop = false
      this.alvards.forEach(alvards => alvards.moveRigth())
      this.polices.forEach(polices => polices.moveRigth())
      this.blocks.forEach(blocks => blocks.move())

    }
    this.mario.move()
  }

  onKeyEvent(event) {
    this.mario.onKeyEvent(event)
    this.background.onKeyEvent(event)
    this.coins.forEach(coin => coin.onKeyEvent(event))
    this.alvards.forEach(alvards => alvards.onKeyEvent(event))
    this.polices.forEach(polices => polices.onKeyEvent(event))
    this.kims.forEach(kims => kims.onKeyEvent(event))
    this.blocks.forEach(blocks => blocks.onKeyEvent(event))
  }

  checkCollisions() {



    const dieAlvards = this.alvards.filter(alvard => !this.bichok.collidesWithAnmie(alvard))
    this.alvards = dieAlvards


    const restCoins = this.coins.filter(coin => !this.mario.collidesWith(coin))
    const newPoints = this.coins.length - restCoins.length
    this.points += newPoints

    if (newPoints) {
      this.sounds.coin.currentTime = 0
      this.sounds.coin.play()
    }

    this.coins = restCoins






    const restAlvards = this.alvards.filter(alvard => !this.mario.collidesWithAlvard(alvard))
    const newAlvards = this.alvards.length - restAlvards.length
    // this.points += newAlvards

    if (newAlvards) {
      this.sounds.alvard.currentTime = 0
      // this.sounds.alvard.play()
      this.sounds.theme.pause()
      this.sounds.theme2.play()
      this.mario.animateDie()
      this.sounds.tati.play()

      this.mario.isDie = true

    }




    this.blocks.map(el => {

      const x = this.mario.collidesWithBlocks(el)

      if (x) {
        this.mario.vy = 0
        this.mario.isJumping = false
      }

      else {
        if (!this.isJumping) {
          // this.mario.isJumping = true

        }
      }


    })


  }





}