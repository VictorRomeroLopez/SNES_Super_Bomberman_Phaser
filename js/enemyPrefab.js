var SuperBomberman = SuperBomberman || {};

SuperBomberman.enemy_prefab = function(_game, _x, _y, _type, _level)
{
    this.posx = (_x * 16 - 8) * gameOptions.gameScale;
    this.posy = (_y * 16 - 8) * gameOptions.gameScale;
    
    if(_type == 1)
        {
            Phaser.Sprite.call(this, _game, this.posx, this.posy, 'tomatoe');
            this.animations.add('walkLeft', [0,1,2,3], 10, true);
            this.animations.add('walkDown', [4,5,6,7], 10, true);
            this.animations.add('walkUp', [8,9,10,11], 10, true);
            this.animations.play('walkLeft');
            this.health = 1;
        }
    this.anchor.setTo(.5);
    this.scale.setTo(gameOptions.gameScale);
    this.speed = 30;
    this.goingY = false;
    this.direction = -1;
    
    _game.add.existing(this);
    _game.physics.arcade.enable(this);
    this.level = _level;
};

SuperBomberman.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.enemy_prefab.prototype.constructor = SuperBomberman.enemy_prefab;

SuperBomberman.enemy_prefab.prototype.update = function(){
    
    this.game.physics.arcade.collide(this,this.level.exteriorWalls);
    this.game.physics.arcade.collide(this,this.level.interiorWalls);
    
    
    
    if(this.body.touching.left || this.body.touching.right || this.body.blocked.left || this.body.blocked.right) 
        {
            console.log('blocked');
            if(Phaser.Math.between(1, 10) >= 8)
                {
                    this.goingY = true;
                    this.body.velocity.y = this.speed*  this.direction;
                }
            else
                {
                    this.direction *=-1;
                    this.scale.x *= -this.direction;
                    this.body.velocity.x = this.speed*  this.direction;
                }
        }
    else if(this.body.touching.up || this.body.touching.down || this.body.blocked.up || this.body.blocked.down) 
        {
            console.log('blocked');
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
    
};