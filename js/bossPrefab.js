var SuperBomberman = SuperBomberman || {};

SuperBomberman.boss_prefab = function(_game, _x, _y, _player)
{
    this.posx = (3 * 16 + _x * 16 - 8);
    this.posy = (4 * 16 + _y * 16 - 8);
    
    Phaser.Sprite.call(this, _game, gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'boss');
    this.animations.add('attack', [1,2,3], 5, false);
	this.anchor.setTo(1/2);
    
    this.damaged = false;
    this.attacking = false;
    this.time = 0;
    this.timeWhenDamaged =0;
    this.timer = SuperBomberman.level1.game.time.create(false);
    this.speed = 30;
    this.goingY = false;
    this.direction = -1;
    this.invulnerability = false;
    this.player = _player;
    this.rowOffset = 1;
    this.timer.start();
    this.health = 5;
    this.score = 1000;
    spaceK = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.timer.loop(50, this.ChangeTint, this, null)

    //GAME
    _game.physics.arcade.enable(this);
    _game.add.existing(this); 
    this.body.setSize(50,50, 12, 50);
}

SuperBomberman.boss_prefab.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.boss_prefab.prototype.constructor = SuperBomberman.boss_prefab;

SuperBomberman.boss_prefab.prototype.update = function()
{
    
    this.time = this.game.time.totalElapsedSeconds();
    if(this.time - this.timeWhenDamaged > 1 && this.damaged)
    {
        this.damaged = false;
        this.tint = 0xffffff;
        if(this.health <=0) {
        SuperBomberman.level1.player.score += this.score;
        //this.deathSound.play();
        this.BossDead();
        }
    }
    if(!SuperBomberman.level1.gameOverBool && this.health > 0)
    {
    
        this.game.physics.arcade.collide(this, SuperBomberman.level1.exteriorWalls);
        this.game.physics.arcade.collide(this, SuperBomberman.level1.player.bombsGroup);
        this.game.physics.arcade.collide(this, this.player, this.KillPlayer,null, this);

        if(!this.damaged && !this.attacking)
        {
            if(this.position.x - this.player.body.x<= 8 && this.position.x - this.player.body.x>= -8)
                {
                    this.body.velocity.x =0;
                }
            else if(this.position.x - this.player.body.x< 8) 
                {
                    if(!this.CheckRowHorizontal())
                        this.MoveRight();
                }
            else if(this.position.x - this.player.body.x> 8 ) 
                {
                    if(!this.CheckRowHorizontal())
                        this.MoveLeft();
                }
            if((this.position.x - this.player.body.x <8 && this.position.x - this.player.body.x >-8) && (this.player.body.y > this.position.y && this.player.body.y <= this.position.y + 62))
                {
                    this.attacking = true;
                    this.animations.play('attack');
                    
                    this.animations.currentAnim.onComplete.add(this.ResetAttack, this);
                }
        }
        else
        {
            this.body.velocity.x =0;
            this.body.velocity.y = 0;
        }
        
    }
    else{
        this.body.velocity.x =0;
        this.body.velocity.y = 0;
    }
    
    if(spaceK.isDown && spaceK.downDuration(1))
        {
            console.log(this.health);
            if(!this.damaged)
            {
                this.timeWhenDamaged = this.time;
                this.score +=50;
                this.damaged = true;
                this.health--;
            }
        }   
}
SuperBomberman.boss_prefab.prototype.ResetAttack = function(){
    
    if((this.position.x - this.player.body.x <8 && this.position.x - this.player.body.x >-8) && (this.player.body.y > this.position.y && this.player.body.y <= this.position.y + 62))
        {
            this.player.playerDied(this.player);
        }
    this.attacking = false;
    this.frame = 0;
}

SuperBomberman.boss_prefab.prototype.KillPlayer = function(_boss, _player){
    _player.playerDied(_player);
}
    SuperBomberman.boss_prefab.prototype.MoveUp = function()
{
    this.direction = -1;
    this.body.velocity.x = 0;
    this.animations.play('walkUp');
    this.body.velocity.y = this.speed * this.direction;
}

SuperBomberman.boss_prefab.prototype.MoveDown = function()
{
    this.direction = 1;
    this.body.velocity.x = 0;
    this.animations.play('walkDown');
    this.body.velocity.y = this.speed * this.direction;
}

SuperBomberman.boss_prefab.prototype.MoveLeft = function()
{
    this.scale.x = -1;
    this.direction = -1;
    this.body.velocity.y = 0;
    this.animations.play('walkRight');
    this.body.velocity.x = this.speed *  this.direction;
}

SuperBomberman.boss_prefab.prototype.MoveRight = function()
{
    this.scale.x = 1;
    this.direction = 1;
    this.body.velocity.y = 0;
    this.animations.play('walkRight');
    this.body.velocity.x = this.speed * this.direction;
}

SuperBomberman.boss_prefab.prototype.CheckRowVertical = function()
{
    if(((this.position.x + 5 + 8) % 16) <= 8 && ((this.position.x + 5 + 8) % 16) >= this.rowOffset)
    {
        this.MoveLeft();
        return true;
    }
    else if(((this.position.x + 5 + 8) % 16) > 8 && ((this.position.x + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.MoveRight();
        return true;
    }
    return false;
}

SuperBomberman.boss_prefab.prototype.CheckRowHorizontal = function()
{
    if(((this.position.y + 5 + 8) % 16) <= 8 && ((this.position.y + 5 + 8) % 16) >= this.rowOffset)
    {
        this.MoveUp();
        return true;
    }
    else if(((this.position.y + 5 + 8) % 16) > 8 && ((this.position.y + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.MoveDown();
        return true;
    }
    return false;
};

SuperBomberman.boss_prefab.prototype.ChangeTint = function()
{
    if(this.damaged)
    {
        console.log("CHANGETINT");
        if(this.tint == 0xffffff)
            this.tint = 0x000000;
        else
            this.tint = 0xffffff;
    }
};

SuperBomberman.boss_prefab.prototype.BossDead = function()
{
    var scoreSaved = false;
    for(var i =0; i<5 && !scoreSaved; i++)
    {
        var score = "score"+i;
        var rankScore = localStorage.getItem(score);
        if(rankScore != "null")
        {

            if( rankScore < this.player.score) {
                for(var j = 4; j>i; j--)
                {
                    localStorage.setItem("score"+j, localStorage.getItem("score"+(j-1)))
                }
                localStorage.setItem(score, this.player.score);
                scoreSaved = true;
            }
        }
        else
        {
            localStorage.setItem(score, this.player.score);
            scoreSaved = true;
        }
    }
    
    SuperBomberman.game.state.start('rankingMenu');
};
