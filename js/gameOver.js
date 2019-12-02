var SuperBomberman = SuperBomberman || {};

SuperBomberman.game_over = function(_game, _x, _y, _level)
{
    this.bg = _game.add.tileSprite(0,0,gameOptions.gameWidth,gameOptions.gameHeight + 40,'backgroundGO');
    
    this.posX = _x; 
    this.posY = _y;
    this.level = _level;
    
    Phaser.Sprite.call(this, _game, _x, _y, 'gameOver');
    this.anchor.setTo(.5);
    
    _game.add.existing(this);
    
    this.continue = _game.add.image(_x, _y - 30, 'continueGO');
    this.continue.anchor.setTo(.5);
    this.yes = _game.add.image(_x -30, _y + 10, 'yesGO');
    this.yes.anchor.setTo(.5);
    this.no = _game.add.image(_x +40, _y + 10, 'noGO');
    this.no.anchor.setTo(.5);
    this.arrow = _game.add.image(_x - 55, _y + 10, 'arrowGO');
    this.arrow.anchor.setTo(.5);
    
    
    cursors = _game.input.keyboard.createCursorKeys();
    enterK = _game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.leftPos = true;
    this.rightPos = false;
};

SuperBomberman.game_over.prototype = Object.create(Phaser.Sprite.prototype);

SuperBomberman.game_over.prototype.constructor = SuperBomberman.game_over;

SuperBomberman.game_over.prototype.update = function(){
    
    this.bg.tilePosition.x+=1;
    this.bg.tilePosition.y+=1;
    
    if (cursors.left.isDown )
        {
            if(this.arrow.position.x > this.posX){
                this.arrow.position.x = this.posX - 55;
                this.leftPos = true;
                this.rightPos = false;
            }
        } 
    else if (cursors.right.isDown )
        {
            if(this.arrow.position.x < this.posX){
                this.arrow.position.x = this.posX + 20;
                this.leftPos = false;
                this.rightPos = true;
            }
        }
    else if(enterK.isDown)
        {
            /*if(this.leftPos)
                this.level.state.restart(true, true);
            else
                this.level.state.start('main', true, true);*/
        }
};