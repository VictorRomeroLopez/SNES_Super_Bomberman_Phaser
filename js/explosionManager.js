var SuperBomberman = SuperBomberman || {};

SuperBomberman.explosionManager = function(_game, _x, _y, _power){
    this.game = _game
    this.posRawX = _x
    this.posRawY = _y
    this.posx = _x * 16 - 8
    this.posy = _y * 16 - 8
    this.power = _power
    
    this.generateExplosionUP = true;
    this.generateExplosionDOWN = true;
    this.generateExplosionLEFT = true;
    this.generateExplosionRIGHT = true;
    
    this.explosionDirection =
    {
        CENTER: 'center',
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right'
    }
    
    this.instantiateExplosions();
}

SuperBomberman.explosionManager.prototype = Object.create(Phaser.Sprite.prototype);
SuperBomberman.explosionManager.prototype.constructor = SuperBomberman.explosionManager;

SuperBomberman.explosionManager.prototype.instantiateExplosions = function(){
    
    this.generateExplosion(this.explosionDirection.CENTER, 5, 0)
    
    for(var i = 0; i < this.power; i++){
        if(i+1 != this.power){
            this.generateExplosion(this.explosionDirection.RIGHT, 4, i)
            this.generateExplosion(this.explosionDirection.LEFT, 4, i)
            this.generateExplosion(this.explosionDirection.DOWN, 6, i)
            this.generateExplosion(this.explosionDirection.UP, 6, i)
        }else{
            this.generateExplosion(this.explosionDirection.RIGHT, 2, i)
            this.generateExplosion(this.explosionDirection.LEFT, 0, i)
            this.generateExplosion(this.explosionDirection.DOWN, 3, i)
            this.generateExplosion(this.explosionDirection.UP, 1, i)
        }
    }
}

SuperBomberman.explosionManager.prototype.generateExplosion = function(_newDirectionExplosion, _idExplosion, _iterator){
    
    this.offset = (16 * (_iterator + 1)) * gameOptions.gameScale;
    
    switch(_newDirectionExplosion){
        case 'up':
            if(this.generateExplosionUP)
            {
                if(layoutMap[(this.posRawY - _iterator - 3) * 13 + (this.posRawX - 2) - 1] != 0 || 
                    (this.posRawY - _iterator - 3) < 0)
                {
                    this.generateExplosionUP = false;
                }
                else
                {
                    new SuperBomberman.explosionPrefab(this.game, this.posx, this.posy - this.offset, _idExplosion)
                }
            }
            break;
        case 'down':
            if(this.generateExplosionDOWN)
            {
                if(layoutMap[(this.posRawY + _iterator - 3) * 13 + (this.posRawX - 2) - 1] != 0 || 
                    (this.posRawY + _iterator - 3) > 8)
                {
                    this.generateExplosionDOWN = false;
                }
                else
                {
                    new SuperBomberman.explosionPrefab(this.game, this.posx, this.posy + this.offset, _idExplosion)
                }
            }
            break;
        case 'left':
            
            if(this.generateExplosionLEFT)
            {
                if(layoutMap[(this.posRawY - 2) * 13 + (this.posRawX - _iterator - 3) - 1] != 0 ||
                  (this.posRawX - _iterator - 3) <= 0)
                {
                   this.generateExplosionLEFT = false;
                }
                else
                {
                    new SuperBomberman.explosionPrefab(this.game, this.posx - this.offset, this.posy, _idExplosion)
                }
            }
            break;
        case 'right':
            if(this.generateExplosionRIGHT)
            {
                if(layoutMap[(this.posRawY - 2) * 13 + (this.posRawX + _iterator - 3) - 1] != 0 || 
                  (this.posRawX + _iterator - 3) > 11)
                {
                   this.generateExplosionRIGHT = false;
                }
                else
                {
                    new SuperBomberman.explosionPrefab(this.game, this.posx + this.offset, this.posy, _idExplosion)
                }
            }
            break;
        case 'center':
            new SuperBomberman.explosionPrefab(this.game, this.posx, this.posy, _idExplosion)
            break;
    }
    
}