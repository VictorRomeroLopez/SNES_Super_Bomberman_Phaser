var SuperBomberman = SuperBomberman || {};

SuperBomberman.playerCol_setup = function(_game, _x, _y, _type, _level, _player)
{
	Phaser.Sprite.call(this, _game, _x, _y, 'bomberman');
            this.animations.add('walkUp', [0,1,2], 7, true);
            this.animations.add('walkDown', [6,7,8], 7, true);
            this.animations.add('walkRight', [12,13,14], 7, true);
	    this.animations.add('death',[18,19,20,21,22,23],7,true);
	this.anchor.setTo(.5);
	this.scale.setTo(.5);
    	this.speed = 50;
    	this.direction = 1;
	this.frame = 7;
    	_game.add.existing(this);
    	_game.physics.arcade.enable(this);
	this.level = _level;
	this.player = _player;
	cursors = _game.input.keyboard.createCursorKeys();
}

SuperBomberman.playerCol_setup.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.playerCol_setup.prototype.constructor = SuperBomberman.player_setup;

SuperBomberman.playerCol_setup.prototype.update = function()
{
	if(this.body.blocked.left || this.body.blocked.up || this.body.blocked.down || this.body.blocked.right )
		this.player.OnCollision(true);

	else if(this.body.touching.left || this.body.touching.up || this.body.touching.down || this.body.touching.right)
		this.player.OnCollision(true);

	else this.player.OnCollision(false);

	//INPUTS
 	if (cursors.up.isDown)
    	{
		this.direction = -1;
		this.body.velocity.x = 0;
        	this.animations.play('walkUp');
		this.body.velocity.y = this.speed*  this.direction;
		
    	}
    	else if (cursors.down.isDown)
    	{
		this.direction = 1;
		this.body.velocity.x = 0;
       		this.animations.play('walkDown');
		this.body.velocity.y = this.speed*  this.direction;
    	}	
	else if (cursors.left.isDown)
    	{
		if(this.scale.x > 0) this.scale.x *= -1;
		this.direction = -1;
		this.body.velocity.y = 0;
       		this.animations.play('walkRight');
		this.body.velocity.x = this.speed*  this.direction;
    	} 
	else if (cursors.right.isDown)
    	{
		if(this.scale.x < 0) this.scale.x *= -1;
		this.direction = 1;
		this.body.velocity.y = 0;
       		this.animations.play('walkRight');
		this.body.velocity.x = this.speed*  this.direction;
    	}
	else
	{
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.frame = 7;
	}
}