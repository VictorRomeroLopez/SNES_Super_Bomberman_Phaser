var SuperBomberman = SuperBomberman || {};

SuperBomberman.enemy_prefab = function(_game, _x, _y, _type, _level)
{
    if(_type == 1)
        {
            Phaser.Sprite.call(this, _game, _x, _y, 'tomatoe');
            this.animations.add('walkLeft', [0,1,2,3], 10, true);
            this.animations.add('walkDown', [4,5,6,7], 10, true);
            this.animations.add('walkUp', [8,9,10,11], 10, true);
            this.animations.play('walkLeft');
        }
    this.anchor.setTo(.5);
    this.speed = 30;
    this.goingY = false;
    this.direction = -1;
    this.initialPos = _x;
    _game.add.existing(this);
    _game.physics.arcade.enable(this);
    this.level = _level;
};

SuperBomberman.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.enemy_prefab.prototype.constructor = SuperBomberman.enemy_prefab;

SuperBomberman.enemy_prefab.prototype.update = function(){
    
    this.level.physics.arcade.collide(this, this.level.wall);
    this.level.physics.arcade.collide(this, this.level.wall2);
    
    
    if(this.body.touching.left || this.body.touching.right) 
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
                    this.scale.x = -this.direction;
                    this.body.velocity.x = this.speed*  this.direction;
                }
        }
    else if(this.body.touching.up || this.body.touching.down) 
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