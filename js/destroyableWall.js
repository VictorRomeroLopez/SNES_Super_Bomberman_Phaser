var SuperBomberman = SuperBomberman || {};

SuperBomberman.destroyableWall = function(_x, _y, _hasUpgrade = false, _hasGoal = false, upperShadow = false, shadowSprite = false){
    this.posX = _x;
    this.posY = _y;
    this.hasGoal = _hasGoal;
    this.hasUpgrade = _hasUpgrade;
    
    if(!shadowSprite){
        Phaser.Sprite.call(this, SuperBomberman.game, _x, _y, 'destroyables')
        this.animations.add('explode', [16,15,14,13,12,13,14,15,16], 10, false)
        
        switch(Math.trunc(Math.random() * 4)){
            case 0:
                this.animations.add('idle', [0,1,2,3],10,true)
                this.animations.add('idleShadow', [4,5,6,7],10,true)
                break;
            case 1:
                this.animations.add('idle', [1,2,3,0],10,true)
                this.animations.add('idleShadow', [5,6,7,4],10,true)
                break;
            case 2:
                this.animations.add('idle', [2,3,0,1],10,true)
                this.animations.add('idleShadow', [6,7,4,5],10,true)
                break;
            case 3:
                this.animations.add('idle', [3,0,1,2],10,true)
                this.animations.add('idleShadow', [7,4,5,6],10,true)
                break;
        }
        
        //Either if the animation have to have the upper shadow or not
        if(upperShadow)
            this.animations.play('idleShadow')
        else
            this.animations.play('idle')
    }else{
        Phaser.Sprite.call(this, SuperBomberman.game, _x, _y, 'destroyables', 8)
    }
    
    SuperBomberman.game.physics.arcade.enable(this);
    this.body.immovable = true;
    
    SuperBomberman.game.add.existing(this)
}

SuperBomberman.destroyableWall.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.destroyableWall.prototype.constructor = SuperBomberman.destroyableWall;

SuperBomberman.destroyableWall.prototype.ExplodeDestroyableWall = function()
{
    this.animations.play('explode')
    this.animations.currentAnim.onComplete.add(this.DestroyThis, this);
}

SuperBomberman.destroyableWall.prototype.DestroyThis = function(){
    if(this.hasUpgrade)
        new SuperBomberman.powerUpPrefab(SuperBomberman.game, Math.trunc(this.posX/16) + 1, Math.trunc(this.posY/16) + 1, SuperBomberman.generateRandomNumber(3));
    
    if(this.hasGoal)
        new SuperBomberman.powerUpPrefab(SuperBomberman.game, Math.trunc(this.posX/16) + 1, Math.trunc(this.posY/16) + 1, 3);
    
    this.kill();
}