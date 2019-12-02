var SuperBomberman = SuperBomberman || {};

SuperBomberman.hud_manager = function(_game, _level)
{
    this.posX = 300;
    this.posY = 18;
    
    
    Phaser.Sprite.call(this, _game, this.posX, this.posY, 'hudNumbers'));
        
    
};

SuperBomberman.hud_manager.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.hud_manager.prototype.constructor = SuperBomberman.hud_manager;