var SuperBomberman = SuperBomberman || {};

SuperBomberman.player_setup = function(_game, _x, _y, _type, _level)
{
    //SPRITE & ANIMATIONS
	Phaser.Sprite.call(this, _game, _x, _y, 'bomberman');
    this.animations.add('walkUp', [0,1,2], 10, true);
    this.animations.add('walkDown', [6,7,8], 10, true);
    this.animations.add('walkRight', [12,13,14], 10, true);
	var deathAnimation = this.animations.add('death',[18,19,20,21,22,23],10,false);
	this.anchor.setTo(1/2, 16/25);
    
    //TIME
    this.time = 0;
    this.timer = this.game.time.create(false);
    this.timer.loop(250, this.ChangeTint, this, null)
    this.timeWhenKilled = 0;
    this.inmortal = false;
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
    this.initialPosX = _x-5;
    this.initialPosY = _y-4;
    this.bombsGroup = _level.add.group()
    this.bombsGroup.enableBody = true
    this.score = 0;
    this.deathSound = _level.game.add.audio('playerDeath');
    this.walkSound = _level.game.add.audio('walk', 1, true);
    this.playerded = false;
    //INPUTS
    spaceK = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	cursors = _game.input.keyboard.createCursorKeys();

    //GAME
    _game.physics.arcade.enable(this);
    _game.add.existing(this);
    
    deathAnimation.onComplete.add(this.AnimationDeath,this); 
    this.body.setSize(10,10,3,13);
    
    this.timer.start();
    //this.body.setSize(16,16,0,9);
}

SuperBomberman.player_setup.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.player_setup.prototype.constructor = SuperBomberman.player_setup;

SuperBomberman.player_setup.prototype.update = function()
{
    
    this.time = this.game.time.totalElapsedSeconds();
    if(this.time - this.timeWhenKilled > 5)
    {
        this.inmortal = false;
        this.tint = 0xffffff;
    }
    
    if(this.health > 0)
    {
        //COLLISIONS
        this.game.physics.arcade.collide(this,this.level.exteriorWalls);  
        this.game.physics.arcade.collide(this,this.level.interiorWalls, this.truncPlayerPos, null, this.level);
        this.game.physics.arcade.overlap(this, this.level.enemies, this.playerDied, null, this.level);
        this.game.physics.arcade.collide(this, this.level.destroyableWallsGroup);
        this.CheckGoNextLevel();

        //INPUTS , ANIMATIONS & MOVEMENT
        if (cursors.up.isDown && !this.playerded)
        {
            if(!this.walkSound.isPlaying)
                this.walkSound.play();
            this.direction = -1;
            this.body.velocity.x = 0;
            this.animations.play('walkUp');
            this.body.velocity.y = this.speed*  this.direction;
        }
        else if (cursors.down.isDown && !this.playerded)
        {
            if(!this.walkSound.isPlaying)
                this.walkSound.play();
            this.direction = 1;
            this.body.velocity.x = 0;
            this.animations.play('walkDown');
            this.body.velocity.y = this.speed*  this.direction;
        }	
        else if (cursors.left.isDown && !this.playerded)
        {
            if(!this.walkSound.isPlaying)
                this.walkSound.play();
            if(this.scale.x > 0) this.scale.x *= -1;
            this.direction = -1;
            this.body.velocity.y = 0;
            this.animations.play('walkRight');
            this.body.velocity.x = this.speed*  this.direction;
        } 
        else if (cursors.right.isDown && !this.playerded)
        {
            if(!this.walkSound.isPlaying)
                this.walkSound.play();
            if(this.scale.x < 0) this.scale.x *= -1;
            this.direction = 1;
            this.body.velocity.y = 0;
            this.animations.play('walkRight');
            this.body.velocity.x = this.speed*  this.direction;
        }
        else if (!this.playerded)
        {
            this.walkSound.stop()
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.frame = 7;
        }

        if(spaceK.isDown && this.bombs < this.maxBombs && spaceK.downDuration(1))
        {
            this.DropBomb();
            this.bombs++;
        }         
        this.level.hpNumber.frame = this.health;
    }
    else
    {
        this.level.gameOverBool = true;
        this.kill();
    }
}

SuperBomberman.player_setup.prototype.CheckGoNextLevel = function(){
    if(Math.trunc(Math.sqrt(Math.pow((this.body.position.x - SuperBomberman.level1.goalPosition.x),2) + Math.pow((this.body.position.y - SuperBomberman.level1.goalPosition.y),2))) < 4 && Utils.prototype.CheckAllEnemiesDied()){
        console.log("Entra a la sortida");
    }
}

SuperBomberman.player_setup.prototype.ChangeTint = function()
{
    if(this.inmortal)
    {
        if(this.tint == 0xffffff)
            this.tint = 0x9c9c9c;
        else
            this.tint = 0xffffff;
    }
}

SuperBomberman.player_setup.prototype.DropBomb = function()
{
    var recicleBomb = this.bombsGroup.getFirstExists(false)
    
    var positionBombX = Math.trunc(this.body.position.x /16)-2
    var positionBombY = Math.trunc(this.body.position.y /16)-3
    
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


SuperBomberman.player_setup.prototype.AnimationDeath = function(_player)
{
    this.walkSound.stop()
    _player.playerded = false;
    _player.reset(_player.initialPosX, _player.initialPosY,_player.health)
}


SuperBomberman.player_setup.prototype.playerDied = function(_player)
{
    if(!_player.inmortal)
    {
         _player.deathSound.play();
        _player.body.velocity.x = 0;
        _player.body.velocity.y = 0;
        _player.timeWhenKilled = _player.time;
        _player.health--;
        _player.inmortal = true;
        _player.playerded = true;
        _player.animations.currentAnim.stop()
        _player.animations.play('death')
         
    }
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

SuperBomberman.player_setup.prototype.truncPlayerPos = function(_player, _wall)
{
}
