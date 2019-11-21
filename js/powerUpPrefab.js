var SuperBomberman = SuperBomberman || {};

SuperBomberman.powerUp_prefab = function(_game, _x, _y, _type, _level)
{
    this.posx = (_x * 16 - 8);
    this.posy = (_y * 16 - 8);
    this.type = _type;
   
    if(this.type == 1)
    {
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('bomb1', [0,8], 10, true);
        this.animations.play('bomb1');
    }
    else if(this.type == 2)
    {
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('bomb2', [1,9], 10, true);
        this.animations.play('bomb2');
    }
    else 
    { 
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('power', [2,10], 10, true);
        this.animations.play('power');
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
    console.log("updating");

    this.game.physics.arcade.overlap(this, this.level.player, this.pickUpPowerUp, null, this.level);  
}

SuperBomberman.powerUp_prefab.prototype.pickUpPowerUp = function(_powerUp, _player)
{
    if(_powerUp.type == 1)
    {
         _player.bombs++;
    }
    else if(_powerUp.type == 2)
    {
         _player.speed+=50;
    }
    else
    {
        _player.power++;
    }
    _powerUp.kill();
}