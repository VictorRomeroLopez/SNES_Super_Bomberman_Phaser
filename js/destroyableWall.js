var SuperBomberman = SuperBomberman || {};

SuperBomberman.destroyableWall = function(_game, _x, _y, upperShadow = false, shadowSprite = false){
    if(!shadowSprite){
        Phaser.Sprite.call(this, _game, _x, _y, 'destroyables')

        this.animations.add('idle', [0,1,2,3], 10, true)
        this.animations.add('idleShadow', [4,5,6,7], 10, true)

        //Either if the animation have to have the upper shadow or not
        if(upperShadow)
            this.animations.play('idleShadow')
        else
            this.animations.play('idle')
    }else{
        Phaser.Sprite.call(this, _game, _x, _y, 'destroyables', 8)
        
    }
    _game.add.existing(this)
}

SuperBomberman.destroyableWall.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.destroyableWall.prototype.constructor = SuperBomberman.destroyableWall;