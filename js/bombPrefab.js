var SuperBomberman = SuperBomberman || {};

SuperBomberman.bombPrefab = function(_game, _x, _y, _power, _level){
    this.timeBombToExplode = 3;
    
    this.posRawX = gameOptions.gameOffsetLeft + _x;
    this.posRawY = gameOptions.gameOffsetTop + _y;
    
    this.posx = (this.posRawX * 16 - 8);
    this.posy = (this.posRawY * 16 - 8);
    
    this.hasExploded = false;
    
    this.power = _power;
    this.game = _game;
    this.level = _level;
    
    Phaser.Sprite.call(this, _game, this.posx, this.posy, 'blue_bomb');
    
    this.animations.add('idle', [0,1,2,1], 7, true);
    this.animations.play('idle');
    
    this.anchor.setTo(0.5);
    
    _game.physics.arcade.enable(this);
    this.body.immovable = true;
    
    this.game.add.existing(this);
    this.timerEvent = this.game.time.events.add(Phaser.Timer.SECOND * this.timeBombToExplode, this.explodeBomb, this);
}

SuperBomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.bombPrefab.prototype.constructor = SuperBomberman.bombPrefab;

SuperBomberman.bombPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.enemies, this.enemyCollision);
}
SuperBomberman.bombPrefab.prototype.UpdateBomb = function(newPosX, newPosY, newPower){
    this.posRawX = newPosX;
    this.posRawY = newPosY;
    this.power = newPower;
    this.hasExploded = false;
    
    this.game.time.events.add(Phaser.Timer.SECOND * this.timeBombToExplode, this.explodeBomb, this);
}

SuperBomberman.bombPrefab.prototype.explodeBomb = function(){
    if(!this.hasExploded){
        this.hasExploded = true;
        new SuperBomberman.explosionManager(this.game, this.posRawX, this.posRawY, this.power, this.level)
        SuperBomberman.level1.player.bombs--;
        this.kill();
    }
    
    SuperBomberman.bombPrefab.prototype.enemyCollision = function(_bomb, _enemy){
        console.log("collided");
        if(_bomb.body.touching.left || _bomb.body.touching.right)
        {
            _enemy.direction *=-1;
            if(_enemy.direction == -1) _enemy.scale.x = 1;
            else _enemy.scale.x = -1;
            _enemy.body.velocity.x = _enemy.speed*  _enemy.direction;
        }
        else if(_bomb.body.touching.up || _bomb.body.touching.down)
        {
            _enemy.direction *=-1;
            _enemy.body.velocity.y = _enemy.speed*  _enemy.direction;
        }
    }
}