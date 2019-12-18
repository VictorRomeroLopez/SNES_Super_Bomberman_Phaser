var SuperBomberman = SuperBomberman || {};

SuperBomberman.enemy_prefab = function(_x, _y, _type)
{
    this.posx = (3 * 16 + _x * 16 - 8);
    this.posy = (4 * 16 + _y * 16 - 8);
    this.deathSound = SuperBomberman.level1.game.add.audio('enemyDeath');
    this.damaged = false;
    this.time = 0;
    this.timeWhenDamaged =0;
    this.timer = SuperBomberman.level1.game.time.create(false);
    this.timer.loop(50, this.ChangeTint, this, null)
    
    this.type = _type;
    
    if(_type == 1)
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'tomatoe');
        this.animations.add('walkLeft', [0,1,2,3], 10, true);
        this.animations.add('walkDown', [4,5,6,7], 10, true);
        this.animations.add('walkUp', [8,9,10,11], 10, true);
        this.animations.play('walkLeft');
        this.health = 1;
        this.score = 100;
    }
    else if(_type == 2)
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'nuez');
        this.animations.add('walkLeft', [24,25,26,27,28,29,30], 10, true);
        this.animations.add('walkDown', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
        this.animations.add('walkUp', [12,13,14,15,16,17,18,19,20], 10, true);
        this.animations.play('walkUp');
        this.health = 1;
        this.score = 200;
    }
    else 
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'ufo');
        this.animations.add('walk', [0,1,2,3,4,5,5,4,3,2,1,0], 10, true);
        this.animations.play('walk')
        this.health = 2;
        this.score = 400;
    }
    
    this.anchor.setTo(.5);
    this.speed = 30;
    this.goingY = false;
    this.direction = -1;
    this.invulnerability = false;
    
    this.timer.start();
};

SuperBomberman.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.enemy_prefab.prototype.constructor = SuperBomberman.enemy_prefab;

SuperBomberman.enemy_prefab.prototype.update = function(){
    
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


        if(this.body.touching.left || this.body.touching.right || this.body.blocked.left || this.body.blocked.right) 
            {
                if(Phaser.Math.between(1, 10) >= 8)
                    {
                        this.goingY = true;
                        this.body.velocity.y = this.speed*  this.direction;
                    }
                else
                    {
                        this.direction *=-1;
                        this.body.velocity.x = this.speed*  this.direction;
                    }
            }
        else if(this.body.touching.up || this.body.touching.down || this.body.blocked.up || this.body.blocked.down) 
            {
                if(Phaser.Math.between(1, 10) >= 8)
                    {
                        this.goingY = false;
                        this.body.velocity.x = this.speed*  this.direction;
                    }
                else
                    {
                        this.direction *=-1;
                        this.body.velocity.y = this.speed*  this.direction;
                    }
            }

        if(!this.goingY)
            {
                this.body.velocity.x = this.speed*  this.direction;
                this.body.velocity.y = 0;
                if(this.body.velocity.x >0) 
                    this.scale.x = -1;
                else
                    this.scale.x = 1;
            }
        else
            {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed*  this.direction;
            }

        if(this.body.velocity.x !=0) 
            {
                this.animations.play('walkLeft');
            }
        else if(this.body.velocity.y <0)
            {
                this.animations.play('walkUp');
            }
        else if(this.body.velocity.y >0 )
            {
                this.animations.play('walkDown');
            }
    }
    else{
        this.body.velocity.x =0;
        this.body.velocity.y = 0;
    }
};

SuperBomberman.enemy_prefab.prototype.ChangeTint = function()
{
    if(this.damaged)
    {
        if(this.tint == 0xffffff)
            this.tint = 0x000000;
        else
            this.tint = 0xffffff;
    }
};