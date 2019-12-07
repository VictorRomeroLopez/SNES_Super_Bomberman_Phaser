var SuperBomberman = SuperBomberman || {};

SuperBomberman.powerUpPrefab = function(_game, _x, _y, _type)
{
    this.posx = (_x * 16 - 8);
    this.posy = (_y * 16 - 8);
    this.kind = _type;
    this.game = _game;
    this.score = 10;
    this.PUsound = SuperBomberman.level1.add.audio('powerUp');
    
    Phaser.Sprite.call(this, _game, this.posx, this.posy, 'bombPU');
    
    this.setAnimationPowerUp();
    
	this.anchor.setTo(.5);
    
    if(this.kind != gameUpgrades.goal)
        _game.physics.arcade.enable(this);
    
    _game.add.existing(this);
};

SuperBomberman.powerUpPrefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.powerUpPrefab.prototype.constructor = SuperBomberman.powerUpPrefab;

SuperBomberman.powerUpPrefab.prototype.update = function()
{
    this.game.physics.arcade.collide(this, SuperBomberman.level1.player, this.powerUpPickup);     
}

SuperBomberman.powerUpPrefab.prototype.powerUpPickup = function(_powerUp, _player)
{  
    if(_powerUp.kind != gameUpgrades.goal){
        _player.manageUpgrades(_powerUp.kind);
        _player.score += _powerUp.score;
        _powerUp.PUsound.play();
        _powerUp.kill(); 
    }
}

SuperBomberman.powerUpPrefab.prototype.setAnimationPowerUp = function(){
    switch(this.kind)
    {
        case gameUpgrades.bomb:
            this.animations.add('animation', [0,8], 10, true);
            break;
        case gameUpgrades.power:
            this.animations.add('animation', [1,9], 10, true);
            break;
        case gameUpgrades.speed:
            this.animations.add('animation', [17,25], 10, true);
            break;
        case gameUpgrades.goal:
            this.animations.add('animation', [21,29], 10, true);
            break;
    }
    this.animations.play('animation')
}
