var SuperBomberman = SuperBomberman || {};

SuperBomberman.explosionManager = function(_game, _x, _y, _power){
    this.game = _game
    this.posx = _x
    this.posy = _y
    this.power = _power
    
    this.instantiateExplosions();
}

SuperBomberman.explosionManager.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.explosionManager.prototype.constructor = SuperBomberman.explosionManager;

SuperBomberman.explosionManager.prototype.instantiateExplosions = function(){
    this.generateExplosion(this.posx, this.posy, 5)
    for(var i = 0; i < this.power; i++){
        this.offset = (16 * (i + 1)) * gameOptions.gameScale;
        if(i+1 != this.power){
            this.generateExplosion(this.posx + this.offset , this.posy, 4)
            this.generateExplosion(this.posx - this.offset, this.posy, 4)
            this.generateExplosion(this.posx, this.posy + this.offset, 6)
            this.generateExplosion(this.posx, this.posy - this.offset, 6)
        }else{
            this.generateExplosion(this.posx - this.offset, this.posy, 0)
            this.generateExplosion(this.posx, this.posy - this.offset, 1)
            this.generateExplosion(this.posx + this.offset, this.posy, 2)
            this.generateExplosion(this.posx, this.posy + this.offset, 3)
        }
    }
}

SuperBomberman.explosionManager.prototype.generateExplosion = function(_x, _y, _idExplosion){
    new SuperBomberman.explosionPrefab(this.game, _x, _y, _idExplosion)
}