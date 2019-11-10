var SuperBomberman = SuperBomberman || {};

SuperBomberman.explosionPrefab = function(_game, _x, _y, _idExplosion){
    this.framerateAnimations = 10;
    Phaser.Sprite.call(this, _game, _x, _y, 'explosions')
    
    this.animations.add('left_bound', [0,1,2,3,4,3,2,1,0], this.framerateAnimations, false)
    this.animations.add('top_bound', [7,8,9,10,11,10,9,8,7], this.framerateAnimations, false)
    this.animations.add('right_bound', [14,15,16,17,18,17,16,15,14], this.framerateAnimations, false)
    this.animations.add('bottom_bound', [21,22,23,24,25,24,23,22,21], this.framerateAnimations, false)
    this.animations.add('horizontal_explosion', [28,29,30,31,32,31,30,29,28], this.framerateAnimations, false)
    this.animations.add('central_explosion', [35,36,37,38,39,38,37,36,35], this.framerateAnimations, false)
    this.animations.add('vertical_explosion', [42,43,44,45,46,45,44,43,42], this.framerateAnimations, false)
    
    switch(_idExplosion){
        case 0:
            this.animations.play('left_bound', this.framerateAnimations, false, true)
            break
        case 1:
            this.animations.play('top_bound', this.framerateAnimations, false, true)
            break
        case 2:
            this.animations.play('right_bound', this.framerateAnimations, false, true)
            break
        case 3:
            this.animations.play('bottom_bound', this.framerateAnimations, false, true)
            break
        case 4:
            this.animations.play('horizontal_explosion', this.framerateAnimations, false, true)
            break
        case 5:
            this.animations.play('central_explosion', this.framerateAnimations, false, true)
            break
        case 6:
            this.animations.play('vertical_explosion', this.framerateAnimations, false, true)
            break
    }
    
    this.scale.setTo(gameOptions.gameScale)
    this.anchor.setTo(.5)
    _game.add.existing(this)
}

SuperBomberman.explosionPrefab.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.explosionPrefab.prototype.constructor = SuperBomberman.explosionPrefab;