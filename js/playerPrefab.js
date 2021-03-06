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
    this.stageComplete = _level.game.add.audio('stageComplete');
    this.playerded = false;
    //INPUTS
    spaceK = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	cursors = _game.input.keyboard.createCursorKeys();

    //GAME
    _game.physics.arcade.enable(this);
    _game.add.existing(this);
    
    deathAnimation.onComplete.add(this.AnimationDeath,this); 
    this.body.setSize(10,10,3,13);
    this.rowOffset = 1;
    
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
    
    if(playerStatistics.lifes > 0)
    {
        //COLLISIONS
        this.game.physics.arcade.collide(this,this.level.exteriorWalls);
        this.game.physics.arcade.collide(this,this.bombsGroup);
        this.game.physics.arcade.collide(this,this.level.interiorWalls, this.truncPlayerPos, null, this.level);
        this.game.physics.arcade.overlap(this, this.level.enemies, this.playerDied, null, this.level);
        this.game.physics.arcade.collide(this, this.level.destroyableWallsGroup);
        this.CheckGoNextLevel();

        //INPUTS , ANIMATIONS & MOVEMENT
        if(!this.playerded){
            
            if (cursors.up.isDown)
            {
                if(!this.CheckPlayerRowVertical())
                    this.UpMovePlayer();
            }
            else if (cursors.down.isDown)
            {
                if(!this.CheckPlayerRowVertical())
                    this.DownMovePlayer();
            }	
            else if (cursors.left.isDown)
            {
                if(!this.CheckPlayerRowHorizontal())
                    this.LeftMovePlayer();
            } 
            else if (cursors.right.isDown)
            {
                if(!this.CheckPlayerRowHorizontal())
                    this.RightMovePlayer();
            }
            else
            {
                this.walkSound.stop()
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.frame = 7;
            }
        }

        if(spaceK.isDown && this.bombs < playerStatistics.maxBombs && spaceK.downDuration(1) && !this.playerded)
        {
            this.DropBomb();
            this.bombs++;
        }         
        this.level.hpNumber.frame = playerStatistics.lifes;
    }
    else
    {
        this.level.gameOverBool = true;
        this.kill();
    }
}

SuperBomberman.player_setup.prototype.UpMovePlayer = function(){
    
    if(!this.walkSound.isPlaying)
        this.walkSound.play();
    
    this.direction = -1;
    this.body.velocity.x = 0;
    this.animations.play('walkUp');
    this.body.velocity.y = playerStatistics.speed * this.direction;
}

SuperBomberman.player_setup.prototype.DownMovePlayer = function(){
    
    if(!this.walkSound.isPlaying)
        this.walkSound.play();
    
    this.direction = 1;
    this.body.velocity.x = 0;
    this.animations.play('walkDown');
    this.body.velocity.y = playerStatistics.speed * this.direction;
}

SuperBomberman.player_setup.prototype.LeftMovePlayer = function(){
    
    if(!this.walkSound.isPlaying)
        this.walkSound.play();
    
    this.scale.x = -1;
    this.direction = -1;
    this.body.velocity.y = 0;
    this.animations.play('walkRight');
    this.body.velocity.x = playerStatistics.speed *  this.direction;
}

SuperBomberman.player_setup.prototype.RightMovePlayer = function(){
    
    if(!this.walkSound.isPlaying)
        this.walkSound.play();
    
    this.scale.x = 1;
    this.direction = 1;
    this.body.velocity.y = 0;
    this.animations.play('walkRight');
    this.body.velocity.x = playerStatistics.speed * this.direction;
}

SuperBomberman.player_setup.prototype.CheckPlayerRowVertical = function(){
    if(((this.body.position.x + 5 + 8) % 16) <= 8 && ((this.body.position.x + 5 + 8) % 16) >= this.rowOffset)
    {
        this.LeftMovePlayer();
        return true;
    }
    else if(((this.body.position.x + 5 + 8) % 16) > 8 && ((this.body.position.x + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.RightMovePlayer();
        return true;
    }
    return false;
}

SuperBomberman.player_setup.prototype.CheckPlayerRowHorizontal = function(){
    if(((this.body.position.y + 5 + 8) % 16) <= 8 && ((this.body.position.y + 5 + 8) % 16) >= this.rowOffset)
    {
        this.UpMovePlayer();
        return true;
    }
    else if(((this.body.position.y + 5 + 8) % 16) > 8 && ((this.body.position.y + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.DownMovePlayer();
        return true;
    }
    return false;
}

SuperBomberman.player_setup.prototype.CheckGoNextLevel = function(){
    if(Math.trunc(Math.sqrt(Math.pow((this.body.position.x - SuperBomberman.level1.goalPosition.x),2) + Math.pow((this.body.position.y - SuperBomberman.level1.goalPosition.y),2))) < 4 && Utils.prototype.CheckAllEnemiesDied()){
        if(!this.stageComplete.isPlaying && actualLevel < 4){
            //this.stageComplete.play();
            this.walkSound.stop();
            
            actualLevel++;
            SuperBomberman.game.state.start('level1');
        }
        SuperBomberman.level1.levelMusic.stop();
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
        recicleBomb = new SuperBomberman.bombPrefab(this.game, positionBombX, positionBombY, playerStatistics.power, this.level)
        this.bombsGroup.add(recicleBomb)
    }
    else
    {
        var positionXworld = positionBombX * 16 + gameOptions.gameOffsetLeft * 16 - 8
        var positionYworld = positionBombY * 16 + gameOptions.gameOffsetTop * 16 - 8
        
        recicleBomb.reset(positionXworld, positionYworld)
        recicleBomb.UpdateBomb(positionBombX + gameOptions.gameOffsetLeft, positionBombY + gameOptions.gameOffsetTop, playerStatistics.power);
    }
}


SuperBomberman.player_setup.prototype.AnimationDeath = function(_player)
{
    _player.playerded = false;
    _player.reset(_player.initialPosX, _player.initialPosY,playerStatistics.lifes)
}


SuperBomberman.player_setup.prototype.playerDied = function(_player)
{
    if(!_player.inmortal)
    {
        _player.walkSound.stop();
        _player.deathSound.play();
        _player.body.velocity.x = 0;
        _player.body.velocity.y = 0;
        _player.timeWhenKilled = _player.time;
        playerStatistics.lifes--;
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
            playerStatistics.maxBombs++;
            break;
        case gameUpgrades.speed:
            playerStatistics.speed += 15;
            break;
        case gameUpgrades.power:
            playerStatistics.power++;
            break;
    }
}

SuperBomberman.player_setup.prototype.truncPlayerPos = function(_player, _wall)
{
    
}
