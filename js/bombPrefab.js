var SuperBomberman = SuperBomberman || {};

SuperBomberman.bombPrefab = function(_game, _x, _y, _power){
    this.timeBombToExplode = 3;
    this.posRawX = _x;
    this.posRawY = _y;
    this.posx = (_x * 16 - 8) * gameOptions.gameScale;
    this.posy = (_y * 16 - 8) * gameOptions.gameScale;
    this.power = _power;
    this.game = _game;
    
    Phaser.Sprite.call(this, _game, this.posx, this.posy, 'blue_bomb');
    
    this.animations.add('idle', [0,1,2,1], 5, true);
    this.animations.play('idle');
    
    this.scale.setTo(gameOptions.gameScale);
    this.anchor.setTo(0.5);
    
    this.game.add.existing(this);
    
    this.game.time.events.add(Phaser.Timer.SECOND * this.timeBombToExplode, this.explodeBomb, this);
}

SuperBomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.bombPrefab.prototype.constructor = SuperBomberman.bombPrefab;

SuperBomberman.bombPrefab.prototype.update = function(){
        
}

SuperBomberman.bombPrefab.prototype.explodeBomb = function(){
    new SuperBomberman.explosionManager(this.game, this.posRawX, this.posRawY, this.power)
    this.kill();
}