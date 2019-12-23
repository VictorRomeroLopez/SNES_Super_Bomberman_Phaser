var SuperBomberman = SuperBomberman || {};

SuperBomberman.boss_prefab = function(_x, _y, _type, _player)
{
    this.posx = (3 * 16 + _x * 16 - 8);
    this.posy = (4 * 16 + _y * 16 - 8);
    this.damaged = false;
    this.time = 0;
    this.timeWhenDamaged =0;
    this.timer = SuperBomberman.level1.game.time.create(false);
    this.anchor.setTo(.5);
    this.speed = 30;
    this.goingY = false;
    this.direction = -1;
    this.invulnerability = false;
    this.player = _player;
    this.rowOffset = 1;
    this.timer.start();
};

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
        this.deathSound.play();
        new SuperBomberman.score_image_prefab(this.body.position.x, this.body.position.y, this.score, this.time)
        this.kill();
        }
    }
    if(!SuperBomberman.level1.gameOverBool && this.health > 0)
    {
    
        this.game.physics.arcade.collide(this, SuperBomberman.level1.exteriorWalls);
        this.game.physics.arcade.collide(this, SuperBomberman.level1.interiorWalls);
        this.game.physics.arcade.collide(this, SuperBomberman.level1.destroyableWallsGroup);
        this.game.physics.arcade.collide(this, SuperBomberman.level1.player.bombsGroup);


        if(this.body.x < this.player.body.x) 
            {
                if(!this.CheckRowHorizontal())
                    this.MoveRight();
            }
        else if(this.body.x > this.player.body.x) 
            {
                if(!this.CheckRowHorizontal())
                    this.MoveLeft();
            }
        /*else if(this.body.y > this.player.body.y) 
            {
                if(!this.CheckRowVertical())
                    this.MoveDown();
            }
        else if(this.body.y < this.player.body.y) 
            {
                if(!this.CheckRowVertical())
                    this.MoveUp();
            }*/

    }
    else{
        this.body.velocity.x =0;
        this.body.velocity.y = 0;
    }
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
    if(((this.body.position.x + 5 + 8) % 16) <= 8 && ((this.body.position.x + 5 + 8) % 16) >= this.rowOffset)
    {
        this.MoveLeft();
        return true;
    }
    else if(((this.body.position.x + 5 + 8) % 16) > 8 && ((this.body.position.x + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.MoveRight();
        return true;
    }
    return false;
}

SuperBomberman.boss_prefab.prototype.CheckRowHorizontal = function()
{
    if(((this.body.position.y + 5 + 8) % 16) <= 8 && ((this.body.position.y + 5 + 8) % 16) >= this.rowOffset)
    {
        this.MoveUp();
        return true;
    }
    else if(((this.body.position.y + 5 + 8) % 16) > 8 && ((this.body.position.y + 5 + 8) % 16) <= (16 - this.rowOffset))
    {
        this.MoveDown();
        return true;
    }
    return false;
};