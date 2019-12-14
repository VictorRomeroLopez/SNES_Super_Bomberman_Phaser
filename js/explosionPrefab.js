var SuperBomberman = SuperBomberman || {};

SuperBomberman.explosionPrefab = function(_game, _x, _y, _idExplosion ,_level){
    this.framerateAnimations = 15;
    Phaser.Sprite.call(this, SuperBomberman.game, _x, _y, 'explosions')
    
    this.level = _level;
    this.score
    this.animations.add('left_bound', [0,1,2,3,4,3,2,1,0], this.framerateAnimations, false)
    this.animations.add('top_bound', [7,8,9,10,11,10,9,8,7], this.framerateAnimations, false)
    this.animations.add('right_bound', [14,15,16,17,18,17,16,15,14], this.framerateAnimations, false)
    this.animations.add('bottom_bound', [21,22,23,24,25,24,23,22,21], this.framerateAnimations, false)
    this.animations.add('horizontal_explosion', [28,29,30,31,32,31,30,29,28], this.framerateAnimations, false)
    this.animations.add('central_explosion', [35,36,37,38,39,38,37,36,35], this.framerateAnimations, false)
    this.animations.add('vertical_explosion', [42,43,44,45,46,45,44,43,42], this.framerateAnimations, false)
    
    switch(_idExplosion){
        case 0:
            this.animations.play('left_bound', this.framerateAnimations, false)
            break
        case 1:
            this.animations.play('top_bound', this.framerateAnimations, false)
            break
        case 2:
            this.animations.play('right_bound', this.framerateAnimations, false)
            break
        case 3:
            this.animations.play('bottom_bound', this.framerateAnimations, false)
            break
        case 4:
            this.animations.play('horizontal_explosion', this.framerateAnimations, false)
            break
        case 5:
            this.animations.play('central_explosion', this.framerateAnimations, false)
            break
        case 6:
            this.animations.play('vertical_explosion', this.framerateAnimations, false)
            break
    }
    this.animations.currentAnim.onComplete.add(this.enemyInvulnerability, this);
    
    this.anchor.setTo(.5)
    SuperBomberman.game.add.existing(this)
    SuperBomberman.game.physics.arcade.enable(this);
    this.body.immovable = true
}

SuperBomberman.explosionPrefab.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.explosionPrefab.prototype.constructor = SuperBomberman.explosionPrefab;

SuperBomberman.explosionPrefab.prototype.update = function()
{
    this.game.physics.arcade.collide(this, this.level.enemies, this.enemyCollision);
    this.game.physics.arcade.collide(this, this.level.player, this.playerCollision);
    this.game.physics.arcade.collide(this, this.level.player.bombsGroup, this.bombCollision);
    this.game.physics.arcade.collide(this, this.level.destroyableWallsGroup, this.destroyableCollisions,null, this);
    this.game.physics.arcade.collide(this, this.level.powerUpsGroup, this.powerUpCollision);
};

SuperBomberman.explosionPrefab.prototype.enemyCollision = function(_explosion, _enemy)
{
    
    if(!_enemy.invulnerability) 
        {
            _enemy.health--;
            _enemy.invulnerability = true;
            _enemy.damaged = true;
            _enemy.timeWhenDamaged = _enemy.time;
        }
}

SuperBomberman.explosionPrefab.prototype.bombCollision = function(_explosion, _bomb)
{
    _bomb.explodeBomb();
}

SuperBomberman.explosionPrefab.prototype.playerCollision = function(_explosion, _player)
{
    if(!_player.inmortal)
    {
        _player.deathSound.play();
        _player.timeWhenKilled = _player.time;
        _player.health--;
        _player.body.position.x = _player.initialPosX;
        _player.body.position.y = _player.initialPosY;
        _player.inmortal = true;
    }
}

SuperBomberman.explosionPrefab.prototype.destroyableCollisions = function(_explosion, _destroyable)
{
    _destroyable.ExplodeDestroyableWall();
    this.kill();
}

SuperBomberman.explosionPrefab.prototype.enemyInvulnerability = function()
{
    for(var i =0; i<this.level.enemies.length;i++)
        {
            if(this.level.enemies.getChildAt(i).invulnerability) this.level.enemies.getChildAt(i).invulnerability = false;
        }
    this.kill();
}

SuperBomberman.explosionPrefab.prototype.powerUpCollision = function(_explosion, _powerUp)
{
    _powerUp.kill()
}