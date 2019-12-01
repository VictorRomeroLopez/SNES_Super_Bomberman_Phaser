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
    this.maxBombs = 1;
    this.bombs = 0;
    this.power = 1;
    this.health = 5;
    this.initialPosX = _x;
    this.initialPosY = _y;
    this.bombsGroup = _level.add.group()
    this.bombsGroup.enableBody = true
    
    //INPUTS
    spaceK = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	cursors = _game.input.keyboard.createCursorKeys();

    //GAME
    _game.physics.arcade.enable(this);
    _game.add.existing(this);
    this.body.setSize(10,10,3,13);
}

SuperBomberman.player_setup.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.player_setup.prototype.constructor = SuperBomberman.player_setup;

SuperBomberman.player_setup.prototype.update = function()
{
    //COLLISIONS
    this.game.physics.arcade.collide(this,this.level.exteriorWalls);  this.game.physics.arcade.collide(this,this.level.interiorWalls);
    this.game.physics.arcade.overlap(this, this.level.enemies, this.enemyCollision, null, this.level);
    this.game.physics.arcade.overlap(this, this.level.explosion, this.enemyCollision, null, this.level);
    this.CheckGoNextLevel();
    
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

    if(spaceK.isDown && this.bombs < this.maxBombs && spaceK.downDuration(1))
    {
        this.DropBomb();
        this.bombs++;
    }         
}

SuperBomberman.player_setup.prototype.CheckGoNextLevel = function(){
    /*console.log(
        Math.sqrt(
        (Math.pow(this.body.position.x - SuperBomberman.level1.goalPosition.x,2)) + (Math.pow(this.body.position.y - SuperBomberman.level1.goalPosition.y,2)))*/
    //console.log(Math.sqrt(Math.pow((this.body.position.x - SuperBomberman.level1.goalPosition.x),2) + Math.pow((this.body.position.y - SuperBomberman.level1.goalPosition.y),2)))
    //if((this.body.position))
}

SuperBomberman.player_setup.prototype.DropBomb = function()
{
    var recicleBomb = this.bombsGroup.getFirstExists(false)
    
    var positionBombX = Math.trunc(this.body.position.x /16)-2
    var positionBombY = Math.trunc(this.body.position.y /16)-1
    
    if(!recicleBomb)
    {
        recicleBomb = new SuperBomberman.bombPrefab(this.game, positionBombX, positionBombY, this.power, this.level)
        this.bombsGroup.add(recicleBomb)
    }
    else
    {
        var positionXworld = positionBombX * 16 + gameOptions.gameOffsetLeft * 16 - 8
        var positionYworld = positionBombY * 16 + gameOptions.gameOffsetTop * 16 - 8
        
        recicleBomb.reset(positionXworld, positionYworld)
        recicleBomb.UpdateBomb(positionBombX + gameOptions.gameOffsetLeft, positionBombY + gameOptions.gameOffsetTop, this.power);
    }
}

SuperBomberman.player_setup.prototype.enemyCollision = function(_player, _enemy)
{
    _player.health--;
    _player.body.position.x = 35;
    _player.body.position.y = 25;
}

SuperBomberman.player_setup.prototype.manageUpgrades = function(type)
{
    switch(type){
        case gameUpgrades.bomb:
            this.maxBombs++;
            break;
        case gameUpgrades.speed:
            this.speed += 15;
            break;
        case gameUpgrades.power:
            this.power++;
            break;
    }
}
