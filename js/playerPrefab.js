var SuperBomberman = SuperBomberman || {};

SuperBomberman.player_setup = function(_game, _x, _y, _type, _level)
{
	Phaser.Sprite.call(this, _game, _x, _y, 'bomberman');
            this.animations.add('walkUp', [0,1,2], 7, true);
            this.animations.add('walkDown', [6,7,8], 7, true);
            this.animations.add('walkRight', [12,13,14], 7, true);
	    this.animations.add('death',[18,19,20,21,22,23],7,true);
	this.anchor.setTo(.5);
    	this.speed = 250;
    	this.direction = 1;
	this.frame = 7;
    	_game.add.existing(this);
    	_game.physics.arcade.enable(this);
	this.level = _level;
	cursors = _game.input.keyboard.createCursorKeys();
}

SuperBomberman.player_setup.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.player_setup.prototype.constructor = SuperBomberman.player_setup;

SuperBomberman.player_setup.prototype.update = function()
{
	this.level.physics.arcade.collide(this, this.level.exteriorWalls);
    	this.level.physics.arcade.collide(this, this.level.interiorWalls);

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