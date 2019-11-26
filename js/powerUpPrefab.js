var SuperBomberman = SuperBomberman || {};

SuperBomberman.powerUp_prefab = function(_game, _x, _y, _type, _level)
{
    this.posx = (_x * 16 - 8);
    this.posy = (_y * 16 - 8);
    this.kind = _type;
    switch(this.kind)
    {
        case 1:
            Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('bomb1', [0,8], 10, true);
        this.animations.play('bomb1');
            break;
        case 2:
            Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('Speed', [1,9], 10, true);
        this.animations.play('Speed');
            break;
        default:
            Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('power', [2,10], 10, true);
        this.animations.play('power');
            break;
    }
    
	this.anchor.setTo(.5);
    this.game = _game;
    this.level = _level;
    _game.physics.arcade.enable(this);
    _game.add.existing(this);
};

SuperBomberman.powerUp_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.powerUp_prefab.prototype.constructor = SuperBomberman.powerUp_prefab;

SuperBomberman.powerUp_prefab.prototype.update = function()
{    
    this.game.physics.arcade.collide(this, this.level.player, this.powerUpPickup, null,this );     
}


SuperBomberman.powerUp_prefab.prototype.powerUpPickup = function(_powerUp, _player)
{  
    _player.manageUpgrades(_powerUp.kind);
    _powerUp.kill();
    
}
