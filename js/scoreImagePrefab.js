var SuperBomberman = SuperBomberman || {};

SuperBomberman.score_image_prefab = function(_x, _y, _type, _time)
{
    this.posx = _x;
    this.posy = _y;
    
    if(_type == 100)
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'score100');
    }
    else if(_type == 200)
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'score200');
    }
    else if(_type == 400)
    {
        Phaser.Sprite.call(this, SuperBomberman.game, this.posx, this.posy, 'score400');
    }
    
    this.anchor.setTo(.5);
    
    this.timer = SuperBomberman.level1.game.time.create(false);
    this.timer.loop(50, this.ChangeTint, this, null)
    
    this.spawnTime = _time;
    this.time = 0;
    SuperBomberman.game.physics.arcade.enable(this);
    
    this.timer.start();
    SuperBomberman.game.add.existing(this);
};

SuperBomberman.score_image_prefab.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.score_image_prefab.prototype.constructor = SuperBomberman.score_image_prefab;

SuperBomberman.score_image_prefab.prototype.update = function(){
    
    this.time = this.game.time.totalElapsedSeconds();
    if(this.time - this.spawnTime > 2)
    {
        this.kill();
    }
    
    this.position.y-= 0.2;
    this.ChangeTint();
    
};

SuperBomberman.score_image_prefab.prototype.ChangeTint = function()
{
    if(this.tint == 0xffffff)
        this.tint = 0x000000;
    else
        this.tint = 0xffffff;
};