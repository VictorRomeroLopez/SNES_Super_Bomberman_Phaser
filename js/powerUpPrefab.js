var SuperBomberman = SuperBomberman || {};

SuperBomberman.powerUp_prefab = function(_game, _x, _y, _type, _level)
{
    this.posx = (_x * 16);
    this.posy = (_y * 16);
    this.type = _type;
    console.log("create")
    if(this.type == 1)
    {
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('bomb', [0,1], 7, true);
        this.animations.play('bomb');
    }
    else if(this.type == 2)
    {
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('bomb', [0,1], 7, true);
        this.animations.play('bomb');
    }
    else 
    { 
        Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
        this.animations.add('power', [2,10], 7, true);
        this.animations.play('power');
    }

	this.anchor.setTo(.5);
    this.game = _game;
    this.level = _level;
    _game.physics.arcade.enable(this);
};

SuperBomberman.powerUp_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.powerUp_prefab.prototype.constructor = SuperBomberman.powerUp_prefab;

SuperBomberman.powerUp_prefab.prototype.update = function()
{    
    console.log("updating")

    this.game.physics.arcade.overlap(this, this.level.player, this.pickUpPowerUp, null, this.level);  
};

SuperBomberman.powerUp_prefab.prototype.pickUpPowerUp = function(powerUp, player)
{
    if(powerUp.type == 1)
    {
         player.speed += 5;
    }
    else if(powerUp.type == 2)
    {
         player.bombs++;
    }
    else
    {
        player.power++;
    }
};