var SuperBomberman = SuperBomberman || {};

SuperBomberman.player_setup = function(_game, _x, _y, _type, _level)
{
    //SPRITE & ANIMATIONS
	Phaser.Sprite.call(this, _game, _x, _y, 'bomberman');
    this.animations.add('walkUp', [0,1,2], 7, true);
    this.animations.add('walkDown', [6,7,8], 7, true);
    this.animations.add('walkRight', [12,13,14], 7, true);
	this.animations.add('death',[18,19,20,21,22,23],7,true);
	this.anchor.setTo(.5);
    
    //MOVEMENT
    this.speed = 50;
    this.direction = 1;
	this.collision = false;
	this.frame = 7;

    //PLAYER VARIABLES
    this.level = _level;
    this.bombs = 5;
    this.power = 7;
    this.health = 5;
    this.initialPosX = _x;
    this.initialPosY = _y;
    
    
    //INPUTS
    spaceK = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	cursors = _game.input.keyboard.createCursorKeys();

    //GAME
    _game.physics.arcade.enable(this);
    _game.add.existing(this);
}

SuperBomberman.player_setup.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.player_setup.prototype.constructor = SuperBomberman.player_setup;

SuperBomberman.player_setup.prototype.update = function()
{
    //COLLISIONS
    this.game.physics.arcade.collide(this,this.level.exteriorWalls);
    this.game.physics.arcade.collide(this,this.level.interiorWalls);
    this.game.physics.arcade.collide(this, this.level.enemyTomatoe, this.enemyCollision);
    this.body.setSize(10,10,3,13);

	//INPUTS , ANIMATIONS & MOVEMENT
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
	
        if(spaceK.isDown && this.bombs > 0 && spaceK.downDuration(1))
        {
            this.bomb = new SuperBomberman.bombPrefab(this.game, Math.trunc(this.body.position.x /16)-2, Math.trunc(this.body.position.y /16)-1, this.power, this.level);
        }         
}

SuperBomberman.player_setup.prototype.enemyCollision = function(_player, _enemy)
{
    console.log("dead")
    _player.health--;
    _player.body.position.x = 35;
    _player.body.position.y = 25;
}
